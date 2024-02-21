const { widget } = figma;
const { Input, AutoLayout, useSyncedState, usePropertyMenu , Text} = widget;

function QuackQuackCalc() {
  const [text, setText] = useSyncedState("text", "")
  const [mode, setmode] = useSyncedState("mode", "Default")
  const modeOptions = [{ option: "pToR", label: "Pixel to Rem" }, { option: "rToP", label: "Rem to Pixel" }]
  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        propertyName: 'modeNess',
        tooltip: 'mode selector',
        selectedOption: mode,
        options: modeOptions,
      },
    ],
    ({propertyName, propertyValue}) => {
      if (propertyName === "modeNess"  && typeof propertyValue === 'string') {
        setmode(propertyValue)
      }
    },
  )
  function roundToDecimalPlaceWithoutTrailingZeroes(num: number): string {
    if (typeof num !== 'number' || isNaN(num)) {
      return "Select a mode"
    }
    const roundedNum = num.toFixed(6);
    // Remove trailing zeroes
    let roundedString = roundedNum.replace(/\.?0*$/, '');
    // If the result is an integer, remove the decimal point
    if (roundedString.indexOf('.') !== -1 && roundedString.endsWith('.')) {
        roundedString = roundedString.slice(0, -1);
    }
    return roundedString;
  }
  let convertedValue;
  if (mode === 'pToR') {
    convertedValue = ((+text) / 16);
  } else if (mode === 'rToP') {
    convertedValue = ((+text) * 16);
  } else {
    convertedValue = "Select a mode";
  }


  return (
    <AutoLayout
      verticalAlignItems="center"
      padding={{ left: 16, right: 8, top: 8, bottom: 8 }}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      stroke={{
        type: 'solid',
        color: '#123456',
      }}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        offset: { x: 0, y: 0 },
        blur: 2,
        spread: 2,
      }}>
      <Input
        fill="#000"
        fontSize={15}
        height="hug-contents"
        horizontalAlignText="left"
        inputBehavior="multiline"
        inputFrameProps={{
          effect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 0.2 },
            offset: { x: 0, y: 0 },
            blur: 2,
            spread: 2,
          },
          fill: "#FFFFFF",
          horizontalAlignItems: "center",
          padding: 8,
          verticalAlignItems: "center",
        }}
        onTextEditEnd={(e) => setText(e.characters)}
        value={text}
        width={135}
        placeholder="Enter a Number"
      />
    <AutoLayout
      verticalAlignItems={'center'}
      padding={10}
    >
      <Text fontSize={12} width={70} horizontalAlignText={'center'}>
        {roundToDecimalPlaceWithoutTrailingZeroes(+convertedValue)}
      </Text>
    </AutoLayout>
    </AutoLayout>
  );
}
widget.register(QuackQuackCalc);