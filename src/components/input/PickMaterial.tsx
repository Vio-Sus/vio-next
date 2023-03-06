interface Props {
    setMaterial: (input: [string]) => void;
    material: string[];
    chosenArray: string[];
    onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
  }



  export default function YearsLabel(props: Props) {
    return (
        <div className="flex flex-col mb-12">
        <span>Material</span>
        {props.material.map((material: string) => (
          <div key={material} className="flex items-center">
            {props.chosenArray.includes(material) ? (
              <input
                type="checkbox"
                name="materials"
                id={material}
                value={material}
                defaultChecked={true}
                onChange={props.onChange}
              />
            ) : (
              <input
                type="checkbox"
                name="materials"
                id={material}
                value={material}
                onChange={props.onChange}
              />
            )}
            <label htmlFor={material} className="ml-2">
              {material}
            </label>
          </div>
        ))}
      </div>
    );
  }
  