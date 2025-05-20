import { useState, useEffect, useRef } from "react";
import "./App.css";
import CheckBox from "./CheckBox/CheckBox";
import Image from "./Image/Image";
import type { IResponse } from "./Interfaces/IResponse";
import axios from "axios";
import { Button } from "./Button/Button";

function App() {
  const [enableCheckBoxState, setEnableCheckboxState] =
    useState<boolean>(false);
  const [refreshCheckBoxState, setRefreshCheckboxState] =
    useState<boolean>(false);
  const [imgData, setImgData] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const getImgData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IResponse[]>(
        `https://api.thecatapi.com/v1/images/search?limit=1`
      );
      setIsLoading(false);
      setImgData(data[0]);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    if (enableCheckBoxState) {
      getImgData();
    }
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleEnableCheckbox = () => {
    if (!enableCheckBoxState) {
      setEnableCheckboxState(true);
      setRefreshCheckboxState(false);
    } else {
      setEnableCheckboxState(false);
      stopInterval();
      setRefreshCheckboxState(false);
    }
  };

  const handleRefreshCheckbox = () => {
    if (!refreshCheckBoxState && enableCheckBoxState) {
      setRefreshCheckboxState(true);
      getImgData();
      intervalRef.current = setInterval(getImgData, 5000);
    } else {
      stopInterval();
      setRefreshCheckboxState(false);
    }
  };

  useEffect(() => {
    return () => stopInterval();
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <CheckBox
          onChange={handleEnableCheckbox}
          checked={enableCheckBoxState}
          name="enable-checkbox"
          appearance="big"
        >
          <span>Enable</span>
        </CheckBox>
        <CheckBox
          onChange={handleRefreshCheckbox}
          checked={refreshCheckBoxState}
          name="refresh-checkbox"
          appearance="small"
        >
          <span>Auto refresh every 5 second</span>
        </CheckBox>
        <Button onClick={handleButtonClick}>
          <span>Get Cat</span>
        </Button>
      </div>
      {!isLoading && !isError && imgData && (
        <Image
          width={imgData.width}
          height={imgData.height}
          imageSrc={imgData.url}
          altText='Милое фото кошки'
        />
      )}
      {isLoading && !isError && <div>Подождите идет загркузка....</div>}
      {isError && <div>Произошла ошибка загрузки фото</div>}
    </div>
  );
}

export default App;
