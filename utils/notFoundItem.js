
const notFoundItem = (item) => {
    if (!item) {

        return res.status(404).json({ 
            code: 404, 
            status: false, 
            message:`${item} not found` 
        });
    }
}

export default notFoundItem;