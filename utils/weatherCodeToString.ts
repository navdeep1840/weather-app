const weatherCodeToString: {
  [key: number]: {
    icon: string;
    label: string;
  };
} = {
  0: {
    icon: "c01d",
    label: "Clear Sky",
  },
};

export default weatherCodeToString;
