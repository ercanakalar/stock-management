import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../store/services/productService";

import "./UpdateProductPage.scss";
import Loader from "../../components/loader/Loader";
import UpdateProduct from "../../features/product/update/UpdateProduct";
import { Suspense } from "react";

const UpdateProductPage = () => {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id || '');
    
    if (isLoading) return <Loader />;

    if (isError) return <div>Something went wrong</div>;

    return (
        <Suspense fallback={<Loader />}>
            <div className="update-product-page-container">
                <div className="update-product-page">
                    {product && <UpdateProduct product={product} />}
                </div>
            </div>
        </Suspense>
    );
};

export default UpdateProductPage;
