import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  robotConnected,
  robotDisconnected,
  robotStateChanged,
} from "../actions";

const MIN_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 30000;

function useRobotConnection() {
  const dispatch = useDispatch();
  const robotUrl = useSelector((state) => state.settings.robot.url);
  const token = useSelector((state) => state.settings.robot.token);

  const esRef = useRef(null);
  const backoffRef = useRef(MIN_BACKOFF_MS);
  const retryTimerRef = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    if (!robotUrl) return;

    activeRef.current = true;

    function connect() {
      if (!activeRef.current) return;

      // EventSource doesn't support custom headers; use URL param for bearer token
      // The HAL robot accepts ?token= as an alternative to Authorization header
      const url = `${robotUrl}/v1/events${token ? `?token=${encodeURIComponent(token)}` : ""}`;
      const es = new EventSource(url);
      esRef.current = es;

      es.onopen = () => {
        backoffRef.current = MIN_BACKOFF_MS;
        dispatch(robotConnected());
      };

      es.addEventListener("state_change", (e) => {
        try {
          dispatch(robotStateChanged(JSON.parse(e.data)));
        } catch (_) {}
      });

      es.onerror = () => {
        es.close();
        esRef.current = null;
        dispatch(robotDisconnected());

        if (!activeRef.current) return;
        retryTimerRef.current = setTimeout(() => {
          backoffRef.current = Math.min(backoffRef.current * 2, MAX_BACKOFF_MS);
          connect();
        }, backoffRef.current);
      };
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        // If the connection is closed, reconnect immediately
        if (!esRef.current || esRef.current.readyState === EventSource.CLOSED) {
          clearTimeout(retryTimerRef.current);
          backoffRef.current = MIN_BACKOFF_MS;
          connect();
        }
      }
    }

    connect();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      activeRef.current = false;
      clearTimeout(retryTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
      dispatch(robotDisconnected());
    };
  }, [robotUrl, token, dispatch]);
}

export default useRobotConnection;
