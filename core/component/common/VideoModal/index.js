import React, { useEffect } from 'react';
import { useRef } from 'react';
import Image from 'next/image';

const VideoModal = ({ showModalVideo, setShowModalVideo }) => {
  const closeModal = () => {
    setShowModalVideo(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showModalVideo) {
        closeModal();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModalVideo]);

  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        showModalVideo ? 'visible' : 'invisible'
      }`}
    >
      <div
        ref={modalRef}
        className='bg-white px-8 pb-8 rounded-lg shadow-lg max-[558px]:px-3 max-[558px]:pb-3'
      >
        <div className='flex justify-end py-1 '>
          <Image
            src='/assets/closeIcon.svg'
            alt='close'
            width={17}
            height={17}
            onClick={closeModal}
            className='max-[558px]:w-5 max-[558px]:h-5'
          />
        </div>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/00PJ6qFigso?autoplay=1'
          title='YouTube Video'
          className='max-[650px]:w-[30rem] max-[650px]:h-60 max-[500px]:w-80 max-[500px]:h-40'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;
