## ADDED Requirements

### Requirement: Robot URL configuration

The system SHALL allow an admin to configure the HAL robot's base URL and bearer token in the Settings panel. These values SHALL be persisted to localStorage. When no URL is configured the robot feature SHALL be entirely hidden from the UI.

#### Scenario: Admin configures robot URL

- **WHEN** the admin enters a URL and token in Settings → Robot and saves
- **THEN** the values are persisted and the Topbar shows a robot status indicator

#### Scenario: No robot configured

- **WHEN** no robot URL is set in settings
- **THEN** no robot-related UI elements are visible anywhere in the app

### Requirement: Robot connection lifecycle

The system SHALL establish an SSE connection to `GET <robotUrl>/v1/events` using the configured bearer token. The connection SHALL be maintained for the lifetime of the browser session and reconnected automatically on drop.

#### Scenario: Successful SSE connection

- **WHEN** a robot URL and token are configured and the app loads
- **THEN** an EventSource connection is opened to `/v1/events` with the bearer token in the Authorization header

#### Scenario: SSE connection drops

- **WHEN** the SSE connection is lost (network error or robot reboot)
- **THEN** the system attempts to reconnect with exponential back-off (max 30s interval)
- **THEN** the Topbar indicator shows "disconnected" state during the gap

#### Scenario: App returns from background

- **WHEN** the browser tab regains visibility after being backgrounded
- **THEN** the SSE connection is verified and re-established if closed

### Requirement: Live robot state in Redux

The system SHALL maintain the current `RobotState` (as defined by the HAL API) in a `robot` Redux slice. State SHALL be updated on every `state_change` SSE event. The `robot` slice SHALL include: `connected`, `robotState`, `robotConfig`, `activeJobId`.

#### Scenario: state_change event received

- **WHEN** the SSE stream emits a `state_change` event
- **THEN** `robot.robotState` is updated in the Redux store with the full payload

#### Scenario: Robot is idle

- **WHEN** `robot.robotState.state === "idle"` and `robot.connected === true`
- **THEN** the Topbar indicator shows a green "ready" badge

#### Scenario: Robot is in error state

- **WHEN** `robot.robotState.state === "error"`
- **THEN** the Topbar indicator shows a red "error" badge with the error code

### Requirement: Topbar robot status indicator

The system SHALL show a compact status indicator in the Topbar when a robot URL is configured. The indicator SHALL reflect the current `RobotState` and connection status.

#### Scenario: Indicator states

- **WHEN** the robot state is `idle` and connected
- **THEN** the indicator is green
- **WHEN** the robot state is `working` or `waiting_for_glass`
- **THEN** the indicator is amber
- **WHEN** disconnected or state is `error`
- **THEN** the indicator is red
- **WHEN** state is `off`
- **THEN** the indicator is grey
