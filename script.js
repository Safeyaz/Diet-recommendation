document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('health-form');
    const mealPlanSection = document.getElementById('meal-plan');
    const mealTableBody = document.querySelector('#meal-table tbody');
    const printButton = document.getElementById('print-button');

    let weeklyMealPlan = [];

    // 🌗 Dark/Light mode toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "mode-toggle";
    toggleBtn.textContent = "☀️"; // default = light
    document.body.appendChild(toggleBtn);

    // Default: Light mode
    document.body.classList.add("light-mode");

    toggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("light-mode")) {
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
            toggleBtn.textContent = "🌙";
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            toggleBtn.textContent = "☀️";
        }
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const age = parseInt(document.getElementById('age').value, 10);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const condition = document.getElementById('condition').value;
        const diet = document.getElementById('diet').value;
        const activity = document.getElementById('activity').value;

        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

        const ageGroup = getAgeGroup(age);

        weeklyMealPlan = generateWeeklyMealPlan(condition, diet, ageGroup);
        displayMealPlan(weeklyMealPlan);

        displayBMIResult(bmi, activity);

        mealPlanSection.classList.remove('hidden');

        //  Scroll smoothly to meal plan
        mealPlanSection.scrollIntoView({ behavior: 'smooth' });
    });

    function getAgeGroup(age) {
        if (age < 13) return "child";
        if (age >= 13 && age <= 19) return "teen";
        if (age >= 20 && age <= 59) return "adult";
        return "senior";
    }

    function generateWeeklyMealPlan(condition, diet, ageGroup) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // ✅ Master meal plan options (your existing data here)
        const mealOptions = {
            none: {
                vegetarian: {
                    adult: [
                        { breakfast: "Masala oats", lunch: "Vegetable biryani", dinner: "Palak paneer with roti" },
                        { breakfast: "Dhokla", lunch: "Dal fry with rice", dinner: "Mushroom curry" },
                    ]
                },
                none: {
                    adult: [
                        { breakfast: "Eggs & toast", lunch: "Chicken curry", dinner: "Grilled salmon" },
                        { breakfast: "Oats & milk", lunch: "Mutton soup", dinner: "Fish curry" },
                    ]
                }
            }
            // ... keep the rest of your mealOptions here
        };

        const meals = (mealOptions[condition] &&
                       mealOptions[condition][diet] &&
                       (mealOptions[condition][diet][ageGroup] || mealOptions[condition][diet].adult))
            || [{ breakfast: "Custom", lunch: "Custom", dinner: "Custom" }];

        return days.map((day, index) => {
            const mealChoice = meals[index % meals.length];
            return { day, ...mealChoice };
        });
    }

    function displayMealPlan(mealPlan) {
        mealTableBody.innerHTML = mealPlan.map(day => `
            <tr>
                <td>${day.day}</td>
                <td contenteditable="true">${day.breakfast}</td>
                <td contenteditable="true">${day.lunch}</td>
                <td contenteditable="true">${day.dinner}</td>
            </tr>
        `).join('');
    }

    function displayBMIResult(bmi, activity) {
        let category, recommendation;

        if (bmi < 18.5) {
            category = "Underweight";
            recommendation = (activity === "high") ? "Reduce activity slightly and focus on calorie-rich meals." :
                             (activity === "moderate") ? "Maintain activity but eat more balanced meals." :
                             "Increase activity gradually with healthy eating.";
        } else if (bmi < 24.9) {
            category = "Normal";
            recommendation = "Maintain your current activity level for a healthy lifestyle.";
        } else if (bmi < 29.9) {
            category = "Overweight";
            recommendation = (activity === "low") ? "Increase your activity level to moderate." :
                             "Maintain or slightly increase intensity.";
        } else {
            category = "Obese";
            recommendation = "Focus on increasing activity gradually and eating low-calorie nutrient-rich foods.";
        }

        let bmiSection = document.getElementById('bmi-section');
        if (!bmiSection) {
            bmiSection = document.createElement('div');
            bmiSection.id = 'bmi-section';
            mealPlanSection.appendChild(bmiSection);
        }

        bmiSection.innerHTML = `
            <h3>Your BMI Result</h3>
            <p><strong>BMI:</strong> ${bmi} (${category})</p>
            <p><strong>Recommendation:</strong> ${recommendation}</p>
        `;
    }

    // 🖨 Print Button
    printButton.addEventListener('click', function () {
        window.print();
    });
});
