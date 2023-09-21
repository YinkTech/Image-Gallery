import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ImageBox = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiAccess = "https://api.artic.edu/api/v1/artworks?page=1&limit=30";

  const onDragStart = (e, image) => {
    e.dataTransfer.setData("text/plain", image.id);
    setDraggedItem(image);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnter = (e) => {
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetImage) => {
    e.preventDefault();

    if (draggedItem && draggedItem.id !== targetImage.id) {
      const updatedImages = images.map((image) => {
        if (image.id === targetImage.id) {
          return draggedItem;
        } else if (image.id === draggedItem.id) {
          return targetImage;
        } else {
          return image;
        }
      });

      setImages(updatedImages);
    }

    setDraggedItem(null);
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await fetch(apiAccess);

        if (response.ok) {
          const data = await response.json();
          const filteredImages = data.data.filter((image) => image.image_id);
          setImages(filteredImages);
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

  return (
    <div className="py-3">
      <div className="mx-auto">
        {/* Add search input */}
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
        <div
          className="p-3 mx-auto text-center"
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, null)}
        >
          {filteredImages.length === 0 ? (
            <div
            data-aos="zoom-in">
              <div class="lds-dual-ring"></div>
              <p className="font-semibold">No matching images found</p>
            </div>
          ) : (
            filteredImages.map((image) => (
              <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
                className="litem text-dark m-3 p-1 hover:opacity-90"
                key={image.id}
                id={image.id}
                draggable
                onDragStart={(e) => onDragStart(e, image)}
                onDrop={(e) => onDrop(e, image)}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                style={{
                  display: "inline-flex",
                  transition: ".5s all ease-in-out",
                  border: "2px solid #facdd0",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={`https://www.artic.edu/iiif/2/${image.image_id}/full/200,/0/default.jpg`}
                  style={{ width: "230px", height: "300px" }}
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
