

export const getcurrentuser = async (req, res) => {
try {
    return res.status(200).json({
        message: "Current user retrieved successfully",
        user: req.user,
    });
} catch (error) {
    return res.status(500).json({
        error: error.message,
    });
}
}