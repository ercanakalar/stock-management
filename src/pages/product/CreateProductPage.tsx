import CreateProduct from "../../features/product/create/CreateProduct";

import "./CreateProductPage.scss";

const CreateProductPage = () => {
    return (
        <div className="create-product-page-container">
            <div className="create-product-page">
                <CreateProduct />
            </div>
        </div>
    );
};

export default CreateProductPage;
