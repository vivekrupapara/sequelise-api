const { idsEncrypter } = require('../helpers');
const productProvider = require('../providers/product.providers');

class ProductController {
    async create(req, res, next) {
        try {
            const payload = {
                ...req.body, user_id: req.user.id
            }


            const isProductExist = await productProvider.getProducts({
                hsn_code: payload.hsn_code,
                user_id: payload.user_id
            })

            if (isProductExist.length) customError("Duplicate entry", 409)

            const product = await productProvider.createProduct(payload);

            res.status(200).json({
                status: true,
                message: "Your data fetched successful.",
                data: idsEncrypter(product),
            });
        } catch (error) {

            next(error);
        }
    }

    async getAllProduct(req, res, next) {
        try {
            const payload = {
                ...req.body, user_id: req.user.id
            }


            const isProductExist = await productProvider.getProducts({
                hsn_code: payload.hsn_code,
                user_id: payload.user_id
            })

            if (isProductExist.length) customError("Duplicate entry", 409)

            const product = await productProvider.createProduct(payload);

            res.status(200).json({
                status: true,
                message: "Your data fetched successful.",
                data: idsEncrypter(product),
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
