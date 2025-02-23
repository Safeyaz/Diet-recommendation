document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('health-form');
    const mealPlanSection = document.getElementById('meal-plan');
    const mealTableBody = document.querySelector('#meal-table tbody');
    const acceptButton = document.getElementById('accept-button');
    const regenerateButton = document.getElementById('regenerate-button');
    const printButton = document.getElementById('print-button');

    let weeklyMealPlan = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const condition = document.getElementById('condition').value;
        const diet = document.getElementById('diet').value;

        weeklyMealPlan = generateWeeklyMealPlan(condition, diet);
        displayMealPlan(weeklyMealPlan);

        mealPlanSection.classList.remove('hidden');
    });

    function generateWeeklyMealPlan(condition, diet) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        const mealOptions = {
            diabetes: {
                vegetarian: [
                    { breakfast: "Oatmeal with berries", lunch: "Chickpea salad", dinner: "Tofu stir-fry" },
                    { breakfast: "Greek yogurt & nuts", lunch: "Quinoa & veggies", dinner: "Vegetable soup" },
                    { breakfast: "Smoothie bowl", lunch: "Lentil curry", dinner: "Grilled paneer with salad" },
                ],
                vegan: [
                    { breakfast: "Chia pudding", lunch: "Vegan chili", dinner: "Stir-fried tofu" },
                    { breakfast: "Fruit smoothie", lunch: "Lentil soup", dinner: "Quinoa salad" },
                ],
                none: [
                    { breakfast: "Oatmeal & berries", lunch: "Grilled chicken salad", dinner: "Steamed veggies with fish" },
                ],
            },
            hypertension: {
                vegetarian: [
                    { breakfast: "Avocado toast", lunch: "Veggie soup", dinner: "Eggplant parmesan" },
                    { breakfast: "Whole grain cereal", lunch: "Lentil salad", dinner: "Stir-fried greens" },
                ],
                vegan: [
                    { breakfast: "Banana smoothie", lunch: "Chickpea curry", dinner: "Grilled tofu" },
                ],
            },
            obesity: {  // Changed from "Obesity" to lowercase "obesity"
                vegetarian: [
                    { breakfast: "Oatmeal with flaxseeds and blueberries", lunch: "Grilled tofu salad with quinoa", dinner: "Lentil soup with steamed broccoli" },
                    { breakfast: "Greek yogurt with chia seeds", lunch: "Vegetable stir-fry with tofu and brown rice", dinner: "Spinach and paneer with whole wheat roti" },
                    { breakfast: "Smoothie with spinach, banana, and almond milk", lunch: "Stuffed bell peppers with quinoa", dinner: "Mushroom soup with grilled asparagus" },
                    { breakfast: "Chia pudding with walnuts and pomegranate", lunch: "Chickpea and spinach curry with millet", dinner: "Vegetable stew with whole wheat bread" },
                    { breakfast: "Scrambled paneer with mixed vegetables", lunch: "Zucchini noodles with pesto", dinner: "Grilled eggplant with hummus" },
                    { breakfast: "Multigrain toast with peanut butter", lunch: "Vegetable and lentil khichdi", dinner: "Stir-fried tofu with greens" },
                    { breakfast: "Moong dal chilla with mint chutney", lunch: "Baked sweet potato with black beans", dinner: "Vegetable soup with mushrooms" }
                ],
                vegan: [
                    { breakfast: "Chia pudding", lunch: "Vegan chili", dinner: "Stir-fried tofu" },
                    { breakfast: "Fruit smoothie", lunch: "Lentil soup", dinner: "Quinoa salad" },
                ],
                none: [
                    { breakfast: "Oatmeal & berries", lunch: "Grilled chicken salad", dinner: "Steamed veggies with fish" },
                ],
            },
        };
    
        
    

        const meals = mealOptions[condition][diet] || [{ breakfast: "Custom", lunch: "Custom", dinner: "Custom" }];
        
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

    regenerateButton.addEventListener('click', function () {
        const condition = document.getElementById('condition').value;
        const diet = document.getElementById('diet').value;

        weeklyMealPlan = generateWeeklyMealPlan(condition, diet);
        displayMealPlan(weeklyMealPlan);
    });

    printButton.addEventListener('click', function () {
        window.print();
    });
});
