import { useEffect, useState } from "react";

export default function CatGallery() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((res) => res.json())
      .then((data) => setCats(data))
      .catch((err) => console.error("Error fetching cats:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cat Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cats.map((cat: any) => (
          <img
            key={cat.id}
            src={cat.url}
            alt="A cute cat"
            className="rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}