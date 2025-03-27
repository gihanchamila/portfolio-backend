
const notFoundItem = (item, res, itemName) => {
    if (!item) {
        return res.status(404).json({ 
            code: 404, 
            status: false, 
            message: itemName + " not found"
        });
    }
}

export default notFoundItem;