import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Sortable from "sortablejs";

const ImageBox = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const apiKey = import.meta.env.VITE_ApiGallery;
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const apiAccess = `${apiKey}`;
  const gridRef = useRef(null);
  const sortableJsRef = useRef(null);

  // Initialize data state with an empty array
  const [data, setData] = useState([]);

  const imageUrl = "https://www.artic.edu/iiif/2/";

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await fetch(apiAccess);

        if (response.ok) {
          const data = await response.json();
          const filteredImages = data.data.filter((image) => image.image_id);
          setImages(filteredImages);

          // Set the initial state of 'data' after 'filteredImages' has been initialized
          setData(filteredImages);
        } else {
          setError("Failed to load images :(");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getImage();
  }, [apiAccess]);

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onListChange = () => {
    const newData = [...gridRef.current.children]
      .map((item) => item.dataset.id)
      .map((id) => data.find((item) => item.id === id));

    sessionStorage.setItem("my-grid", JSON.stringify(newData));
    setData(newData);
  };

  useEffect(() => {
    sortableJsRef.current = new Sortable(gridRef.current, {
      animation: 150,
      onEnd: onListChange,
    });
  }, []);

  return (
    <div className="py-3">
      <div className="mx-auto">
        <input
          type="text"
          placeholder="Search.."
          className="p-1 bg-white mx-auto my-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {error ? (
        <p className="text-buttonred text-2xl max-[280]:text-base md:text-[36px]">
          {error}
        </p>
      ) : (
        <div ref={gridRef} className=" mx-auto text-center">
          {filteredImages.length === 0 ? (
            <div data-aos="zoom-in">
              <div className="lds-hourglass"></div>
              <p className="font-semibold">No matching images found</p>
            </div>
          ) : (
            filteredImages.map((image) => (
              <div
                className="litem text-dark m-2 p-1 hover:opacity-90"
                key={image.id}
                id={image.id}
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                style={{
                  display: "inline-flex",
                  transition: ".5s all ease-in-out",
                  border: "2px solid #facdd0",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={`${imageUrl}${image.image_id}/full/200,/0/default.jpg`}
                  className="w-[130px] h-[200px] sm:w-[200px] sm:h-[250px] md:w-[230px] md:h-[300px]"
                  alt={image.title}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ImageBox;
