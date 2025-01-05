import { Formik } from 'formik';
import { Input, Button, Form as AntForm, message } from 'antd';
import { createProductInitial, createProductValidation } from '../../../validation/createProduct.validation';
import { useCreateProductMutation } from '../../../store/services/productService';
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {
    const navigate = useNavigate();

    const [createProduct, { isLoading }] = useCreateProductMutation();

    const handleSubmit = async (values: typeof createProductInitial, { resetForm }: any) => {
        try {
            await createProduct({
                ...values,
                createdAt: new Date().toISOString(),
            }).unwrap();
            message.success('Product created successfully!');
            resetForm();
            navigate('/');
        } catch (error) {
            message.error('Failed to create product. Please try again.');
        }
    };

    return (
        <Formik
            initialValues={createProductInitial}
            validationSchema={createProductValidation}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                <AntForm onFinish={handleSubmit} layout="vertical">
                    <AntForm.Item
                        label="Name"
                        validateStatus={touched.name && errors.name ? 'error' : ''}
                        help={touched.name && errors.name}
                    >
                        <Input
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Image URL"
                        validateStatus={touched.image && errors.image ? 'error' : ''}
                        help={touched.image && errors.image}
                    >
                        <Input
                            name="image"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.image}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Price"
                        validateStatus={touched.price && errors.price ? 'error' : ''}
                        help={touched.price && errors.price}
                    >
                        <Input
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Description"
                        validateStatus={touched.description && errors.description ? 'error' : ''}
                        help={touched.description && errors.description}
                    >
                        <Input.TextArea
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Model"
                        validateStatus={touched.model && errors.model ? 'error' : ''}
                        help={touched.model && errors.model}
                    >
                        <Input
                            name="model"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.model}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Brand"
                        validateStatus={touched.brand && errors.brand ? 'error' : ''}
                        help={touched.brand && errors.brand}
                    >
                        <Input
                            name="brand"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.brand}
                        />
                    </AntForm.Item>

                    <AntForm.Item
                        label="Quantity"
                        validateStatus={touched.quantity && errors.quantity ? 'error' : ''}
                        help={touched.quantity && errors.quantity}
                    >
                        <Input
                            name="quantity"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quantity}
                        />
                    </AntForm.Item>

                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Create Product
                    </Button>
                </AntForm>
            )}
        </Formik>
    );
};

export default CreateProduct;
