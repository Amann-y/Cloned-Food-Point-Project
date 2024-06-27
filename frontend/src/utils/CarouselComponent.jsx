import Carousel from "react-bootstrap/Carousel";

function CarouselComponent() {
  return (
    <Carousel className="mx-auto mt-0">
      <Carousel.Item interval={1500} className="mx-auto ">
        <img
          src="vegFood.png"
          className="w-100 h-auto object-fit-contain"
          text="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          src="Picture2.png"
          className="w-100 h-auto object-fit-contain"
          text="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          src="Picture3.png"
          className="w-100 h-auto object-fit-contain"
          text="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
