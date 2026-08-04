import React, { useEffect, useRef, useState } from "react";
import { StoreProvider, useStore, IS_DEMO } from "./lib/store.jsx";
import { NavBar } from "./components/app/NavBar.jsx";
import { Onboarding } from "./screens/Onboarding.jsx";
import { Home } from "./screens/Home.jsx";
import { Navigator } from "./screens/Navigator.jsx";
import { Playbook } from "./screens/Playbook.jsx";
import { ProtocolDetail } from "./screens/ProtocolDetail.jsx";
import { CauseDetail } from "./screens/CauseDetail.jsx";
import { MyPlan } from "./screens/MyPlan.jsx";
import { OutcomeReview } from "./screens/OutcomeReview.jsx";

const TAB_SCREENS = new Set(["home", "navigator", "playbook", "plan"]);

function Shell() {
  const { state } = useStore();
  const [route, setRoute] = useState({ screen: "home", params: {} });
  const stackRef = useRef([]);
  const scrollRef = useRef(null);

  const navigate = (screen, params = {}) => {
    stackRef.current.push(route);
    setRoute({ screen, params });
  };

  const goBack = () => {
    const prev = stackRef.current.pop();
    setRoute(prev ?? { screen: "home", params: {} });
  };

  const switchTab = (screen) => {
    stackRef.current = [];
    setRoute({ screen, params: {} });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [route]);

  if (!state.profile.onboarded) {
    return (
      <div className="app-frame">
        <div className="app-scroll" style={{ paddingBottom: 0 }}>
          <Onboarding />
        </div>
      </div>
    );
  }

  const { screen, params } = route;
  // Which tab is highlighted while on a detail screen
  const activeTab =
    screen === "protocol" || screen === "cause"
      ? "playbook"
      : screen === "outcome"
        ? "plan"
        : TAB_SCREENS.has(screen)
          ? screen
          : "home";

  return (
    <div className="app-frame">
      {IS_DEMO && (
        <div
          style={{
            background: "var(--navy-800)",
            color: "var(--text-on-brand)",
            fontSize: "11.5px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textAlign: "center",
            padding: "7px 12px",
          }}
        >
          DEMO · Example data for Wren, 8 weeks — explore freely, refresh to reset
        </div>
      )}
      <div className="app-scroll" ref={scrollRef}>
        {screen === "home" && <Home navigate={navigate} />}
        {screen === "navigator" && <Navigator navigate={navigate} />}
        {screen === "playbook" && <Playbook navigate={navigate} params={params} />}
        {screen === "protocol" && <ProtocolDetail navigate={navigate} goBack={goBack} params={params} />}
        {screen === "cause" && <CauseDetail navigate={navigate} goBack={goBack} params={params} />}
        {screen === "plan" && <MyPlan navigate={navigate} />}
        {screen === "outcome" && <OutcomeReview navigate={navigate} goBack={goBack} params={params} />}
      </div>
      <NavBar current={activeTab} onNavigate={switchTab} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
