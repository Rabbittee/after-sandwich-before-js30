import clsx from "clsx";
export function Card({ title, children }) {
  return (
    <fieldset className="border rounded-md px-4 py-2">
      <legend
        className={clsx("text-lg font-bold", {
          "px-2": title,
        })}
      >
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export function TempCard({ title, temp, time }) {
  return (
    <Card title={title}>
      <div className="flex items-end">
        <section>
          <span className="text-2xl font-bold">{temp}</span>
          <span className="text-sm">°C</span>
        </section>
        <span className="ml-auto">{time}</span>
      </div>
    </Card>
  );
}

export function StationCard({ type, name, district, elevation, temp, time }) {
  return (
    <Card title={type}>
      <div className="flex flex-col">
        <div>
          <span className="text-lg font-bold font-lg">{name}</span>
          <span className="text-sm font-bold font-lg ml-2">
            {elevation}公尺
          </span>
        </div>
        <section className="flex flex-row">
          <div>
            <div className="text-sm"> {district}</div>
            <div>時間: {time}</div>
          </div>
          <div className="text-4xl ml-auto">
            <span>{temp}</span>
            <span className="text-lg">°C</span>
          </div>
        </section>
      </div>
    </Card>
  );
}
