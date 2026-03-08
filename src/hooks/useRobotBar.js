import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { robotConfigLoaded, robotBarSynced } from "../actions";

function resolveType(liquidName, aliases) {
  const nameLower = liquidName.toLowerCase();
  for (const [type, variants] of Object.entries(aliases)) {
    if (variants.some((v) => v.toLowerCase() === nameLower)) {
      return type;
    }
  }
  return null;
}

function useRobotBar() {
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.robot.connected);
  const robotUrl = useSelector((state) => state.settings.robot.url);
  const token = useSelector((state) => state.settings.robot.token);
  const aliases = useSelector(
    (state) => state.settings.robot.ingredientAliases,
  );

  useEffect(() => {
    if (!connected || !robotUrl) return;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`${robotUrl}/v1/config`, { headers })
      .then((r) => r.json())
      .then((config) => {
        dispatch(robotConfigLoaded(config));

        const barEntries = [];
        const unresolvedLiquids = [];

        (config.liquids || []).forEach((liquid) => {
          const type = resolveType(liquid.name, aliases);
          if (type) {
            barEntries.push({
              ingredient: liquid.name,
              type,
              source: "robot",
            });
          } else {
            unresolvedLiquids.push(liquid);
          }
        });

        dispatch(robotBarSynced(barEntries, unresolvedLiquids));
      })
      .catch((err) => {
        console.warn("[useRobotBar] Failed to fetch robot config:", err);
      });
  }, [connected, robotUrl, token, aliases, dispatch]);
}

export default useRobotBar;
