import React, { Suspense, useEffect, useRef } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Button, Pagination } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useGetProductsQuery } from '../../store/services/productService';
import {
  setPaginationPage,
  setProducts,
} from '../../store/slices/productSlice';

import Loader from '../../components/loader/Loader';

import './Product.scss';
import ProductCard from '../../components/card/productCard/ProductCard';
import { useResponsive } from '../../provider/ResponsiveProvider';

export const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.product.searchTerm);
  const sort = useAppSelector((state) => state.product.sort);
  const paginationPage = useAppSelector((state) => state.product.pagination);
  const products = useAppSelector((state) => state.product.products);
  const available = useAppSelector((state) => state.product.available);

  const prevSearchTermRef = useRef<string>(searchTerm);

  const { isMobile } = useResponsive();

  const {
    data: calledProducts,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery();

  useEffect(() => {
    if (!calledProducts) return;

    const productsCopy = [...calledProducts];
    let filteredAndSortedProducts = productsCopy;

    if (available === 'Yes') {
      filteredAndSortedProducts = productsCopy.filter(
        (product) => product.quantity > 0
      );
    } else if (available === 'No') {
      filteredAndSortedProducts = productsCopy.filter(
        (product) => product.quantity === 0
      );
    }

    if (sort === 'A-Z') {
      filteredAndSortedProducts.sort((a, b) =>
        a.name.replace(' ', '').localeCompare(b.name.replace(' ', ''))
      );
    } else if (sort === 'Price high to low') {
      filteredAndSortedProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    } else if (sort === 'Price low to high') {
      filteredAndSortedProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    refetch();

    dispatch(setProducts(filteredAndSortedProducts));
  }, [available, sort, dispatch, calledProducts, refetch]);

  const itemsPerPage = 6;

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  const currentProducts = filteredProducts?.slice(
    isMobile ? 0 : (paginationPage - 1) * itemsPerPage,
    paginationPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    dispatch(setPaginationPage(page));
  };

  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm) {
      dispatch(setPaginationPage(1));
      prevSearchTermRef.current = searchTerm;
    }
  }, [searchTerm, dispatch]);

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if ('status' in error) {
      const err = error as FetchBaseQueryError;
      return `Error ${err.status}: ${
        err.data && typeof err.data === 'object' && 'message' in err.data
          ? (err.data as any).message
          : 'An error occurred while fetching products.'
      }`;
    } else if ('message' in error) {
      return error.message || 'An unknown error occurred.';
    }
    return 'An unknown error occurred.';
  };

  if (isLoading) {
    return (
      <div className='loader-container'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className='error-container'>{getErrorMessage(error)}</div>;
  }

  return (
    <>
      <div className='product-container'>
        {currentProducts?.length ? (
          currentProducts.map((product) => (
            <Suspense key={product.id} fallback={<Loader />}>
              <ProductCard product={product} className='product-card' />
            </Suspense>
          ))
        ) : (
          <div className='no-products'>No products found</div>
        )}
      </div>
      {totalPages > 1 && !isMobile && (
        <Pagination
          align='center'
          current={paginationPage}
          total={filteredProducts?.length || 0}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          className='pagination-container'
          showSizeChanger={false}
        />
      )}
      {isMobile && currentProducts && currentProducts.length < totalPages && (
        <Button
          className='load-more-button'
          onClick={() => handlePageChange(paginationPage + 1)}
        >
          Load More
        </Button>
      )}
    </>
  );
};
