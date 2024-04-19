import asyncHandler from 'express-async-handler';
import Dish from '../models/dishModel.js';

const getAllDish = asyncHandler(async (req, res) => {
    try {
        const dishes = await Dish.find({}); // Retrieve all dishes

        if (dishes.length > 0) {
            res.status(200).send(
                {
                    code: 200,
                    success: true,
                    timestamp: Date.now(),
                    message: "All dishes Response",
                    items: dishes
                }
            );
        } else {
            res.status(404).json({ error: 'No dishes found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

const getDish = asyncHandler(async (req, res) => {
    const dish = await Dish.findById(req.query._id)

    if (dish) {
        res.status(200).send(
            {
                code: 200,
                success: true,
                timestamp: Date.now(),
                message: "A dish Response",
                items: dish
            }
        );
    } else {
        res.status(404).json({ message: 'No dish found' })
    }
})

const addDish = asyncHandler(async (req, res) => {
    try {
        const { Name, Description, Image, Video, Ingredients } = req.body

        console.log(Name, Description, Image, Video, Ingredients)
        const dish = await Dish.create({ Name, Description, Image, Video, Ingredients })

        if (dish) {
            res.status(201).send(
                {
                    code: 201,
                    success: true,
                    timestamp: Date.now(),
                    message: "Add dish Response",
                    items: dish
                }
            )
        } else {
            res.status(400)
            throw new Error('Add Dish Failed')
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

const editDish = asyncHandler(async (req, res) => {
    try {
        const { _id, Name, Description, Image, Video, Ingredients } = req.body;
console.log(req.body)
        const dish = await Dish.findById(_id); // Assuming Dish is your Mongoose model
        if (!dish) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }

        dish.Name = Name;
        dish.Description = Description;
        dish.Image = Image;
        dish.Video = Video;
        dish.Ingredients = Ingredients;

        // Save the updated dish
        await dish.save();

        res.status(200).send({
            code: 200,
            success: true,
            timestamp: Date.now(),
            message: "Update dish Response",
            items: dish
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Update inventory Failed'})
    }
})

const deleteDish = asyncHandler(async (req, res) => {
    try {
        const dish = await Dish.findById(req.body._id)
        if (!dish) {
            res.status(404).json({ message: 'Dish not found' });
            return;
        }

        // Delete the dish
        await dish.remove();

        res.status(200).send(
            {
                code: 200,
                success: true,
                timestamp: Date.now(),
                message: "inventory deleted successfully",
                items: dish
            }
        )
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

export { addDish, deleteDish, editDish, getAllDish, getDish };

