const ITEMS = [
  "Fresh Yam",
  "Suya Spice",
  "Small Chops",
  "Palm Oil",
  "Ofada Rice",
  "Chin Chin",
  "Puff-Puff",
  "Malta Guinness",
];

export function Marquee() {
  const seq = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="mx-3.5">
          {item} <span className="text-black/60">✦</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee bg-secondary text-black border-b-2 border-black py-2.5" aria-hidden="true">
      <div className="marquee-track">
        {seq}
        {seq}
      </div>
    </div>
  );
}
