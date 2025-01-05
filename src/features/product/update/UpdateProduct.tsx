import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Form as AntForm, message } from 'antd';
import { createProductValidation } from '../../../validation/createProduct.validation';
import { useUpdateProductMutation } from '../../../store/services/productService';
import { Product } from '../../../type/product-type';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = (props: { product: Product }) => {
    const navigate = useNavigate();

    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const handleSubmit = async (values: Product, { resetForm }: any) => {
        try {
            await updateProduct({
                ...values,
                createdAt: new Date().toISOString(),
            }).unwrap();
            message.success('Product updated successfully!');
            resetForm();
            navigate('/');
        } catch (error) {
            message.error('Failed to update product. Please try again.');
        }
    };

    return (
        <Formik
            initialValues={{
                name: props.product?.name || '',
                image: props.product?.image || '',
                price: props.product?.price || '',
                description: props.product?.description || '',
                model: props.product?.model || '',
                brand: props.product?.brand || '',
                quantity: props.product?.quantity || 0,
                createdAt: props.product?.createdAt || '',
                id: props.product?.id || '',
            }}
            validationSchema={createProductValidation}
            onSubmit={handleSubmit}
            enableReinitialize // This ensures the form updates if props.product changes
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
                            type="number"
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
                        Update Product
                    </Button>
                </AntForm>
            )}
        </Formik>
    );
};

export default UpdateProduct;
