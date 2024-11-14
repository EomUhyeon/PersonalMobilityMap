import Queue from "./Queue.js";
import Map from "./map/map.js";
import Menu from "./menu/menu.js";
import HiddenMenu from "./menu/hidden_menu.js"

function App() {
  const searchQueue = Queue();
  const popupQueue = Queue();

  return (
    <>
      <Map 
        getSearch={searchQueue.get} 
        isEmptySearch={searchQueue.isEmpty}
        putPopup={popupQueue.put}
      />
      <Menu 
        putSearch={searchQueue.put}
        getPopup={popupQueue.get}
        isEmptyPopup={popupQueue.isEmpty}
      />
      <HiddenMenu 
        getPopup={popupQueue.get}
        isEmptyPopup={popupQueue.isEmpty}
      />
    </>
  );
};

export default App;
