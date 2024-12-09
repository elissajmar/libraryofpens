import { render, fireEvent, getByTestId } from "@testing-library/react";
import PenCard from "./penCard.jsx";
import { MemoryRouter } from "react-router-dom";
import PenPage from "./penPage.jsx";

const pens = [
  {
    "id": "1",
    "name": "Tombow Dual Brush Pen",
    "setId": "1",
    "brandId": "0",
    "tipId": "3",
    "categoryId": "4",
    "color": "126 Light Olive",
    "img_name": "TombowDualBrush.jpg",
    "url": "https://www.tombowusa.com/dual-brush-pen.html",
    "retail_price_USA": "$3.45",
    "brand": {
      "id": "0",
      "name": "Tombow",
      "website": "https://www.tombowusa.com/"
    },
    "category": {
      "id": "4",
      "name": "Brush Pen"
    },
    "tip": {
      "id": "3",
      "name": "Brush"
    }
  }
]

const pen = pens[0];

test("renders brand name correctly", () => {
  const { getByTestId } = render(
      <PenPage
        img={pen.img_name}
        name={pen.name}
        penId={pen.id}
        retail_price_USA={pen.retail_price_USA}
        brand={pen.brand.name}
        category={pen.category.name}
        color={pen.color}
        tip={pen.tip.name}
        favorite={true}
        setFavorite={(favorite) => {    
        }}
        renderHeart={(favorite) => {
        }}
      ></PenPage>
  );

  expect(getByTestId("name").textContent).toBe("Tombow Dual Brush Pen");
  
});