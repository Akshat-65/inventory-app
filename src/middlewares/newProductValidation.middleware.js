import { body, validationResult } from "express-validator";

const validateNewProductRequest = async(req,res,next)=>{
// set up the rules
    const rules=[
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price must be a positive value"),
        body('imageUrl').isURL().withMessage(" Invalid URL"),
    ];

    // run the rules

    await Promise.all(rules.map(rule=>rule.run(req)));

    //checking for any error after running the rules
   let validationErrors = validationResult(req);
    // validate data
    // const { name, price, imageUrl } = req.body;
    // let errors = [];
    // if (!name || name.trim() == '') {
    //   errors.push('Name is required');
    // }
    // if (!price || parseFloat(price) < 1) {
    //   errors.push(
    //     'Price must be a positive value'
    //   );
    // }
    // try {
    //   const validUrl = new URL(imageUrl);
    // } catch (err) {
    //   errors.push('URL is invalid');
    // }

    // if error returning the error message

    if (!validationErrors.isEmpty()) {
      return res.render('new-product', {
        errorMessage: validationErrors.array()[0].msg,
      });
    }

    next();
};

export default validateNewProductRequest;