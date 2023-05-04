import { Global } from '@emotion/react';
import { Layout } from '../Layout/Layout';
import { Style } from '../GlobalStyle';
import { useEffect, useRef, useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGalery';
import { LoadButton } from 'components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from 'components/Modal/Modal';
import { ERROR_MSG, toastErrStyle } from 'components/constant';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const perPage = useRef(12);
  const [activeImg, setActiveImg] = useState(null);
  const [activeAlt, setActiveAlt] = useState(null);
  const isLoadBtn = !!(total > images.length && !isLoading);
  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotal(null);
    setIsLoading(false);
  };
  const openModal = (url, alt) => {
    setShowModal(!showModal);
    setActiveImg(url);
    setActiveAlt(alt);
  };
  useEffect(() => {
    console.log(query);
    if (!query) return;
    const getImages = async (query, page, perPage) => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(query, page, perPage);
        if (!hits.length) toast.error(ERROR_MSG['msg'], toastErrStyle);
        setQuery(query);
        setImages(prevImg => [...prevImg, ...hits]);
        setIsLoading(false);
        setTotal(totalHits);
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    };
    getImages(query, page, perPage.current);
  }, [query, page]);

  return (
    <Layout>
      <Searchbar
        initial={query}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      ></Searchbar>
      <ImageGallery onClick={openModal} items={images} />
      {isLoading && <Loader />}
      {isLoadBtn && <LoadButton onClick={() => setPage(prev => prev + 1)} />}
      {showModal && (
        <Modal onClose={() => setShowModal(!showModal)}>
          <img src={activeImg} alt={activeAlt} />
        </Modal>
      )}
      <Toaster position="top-right" />
      <Global styles={Style} />
    </Layout>
  );
};
