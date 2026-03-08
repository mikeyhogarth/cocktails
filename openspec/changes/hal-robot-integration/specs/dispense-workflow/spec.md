## ADDED Requirements

### Requirement: Make it! button on cocktail detail

The system SHALL show a "Make it!" button on the CocktailPage when: (a) a robot URL is configured, (b) `robot.connected` is true, (c) `robot.robotState.state === "idle"`, and (d) at least one cocktail ingredient is matched to a loaded robot liquid. The button SHALL be disabled with a tooltip when the robot is not idle or no ingredients match.

#### Scenario: Button shown when robot is ready

- **WHEN** the robot is connected and idle and the cocktail has at least one dispensable ingredient
- **THEN** the "Make it!" button is visible and enabled on the cocktail detail page

#### Scenario: Button disabled when robot is busy

- **WHEN** the robot state is `working`, `waiting_for_glass`, or `drink_ready`
- **THEN** the "Make it!" button is visible but disabled with a tooltip indicating the robot is busy

#### Scenario: Button hidden when no robot configured

- **WHEN** no robot URL is set in settings
- **THEN** no "Make it!" button appears on any cocktail detail page

### Requirement: Size selection before dispensing

The system SHALL present a size selector (derived from `robot.robotConfig.glass_types`) before submitting a dispensing job. The selector SHALL default to the middle glass size.

#### Scenario: Size options from robot config

- **WHEN** the admin clicks "Make it!" and the robot config has glass_types `[short, medium, long]`
- **THEN** the user sees a size selector with those options, defaulting to "medium"

#### Scenario: Size selection required

- **WHEN** the user has not selected a size
- **THEN** the dispense submit button is disabled

### Requirement: Pre-mix manual instructions

Before submitting the job the system SHALL display a pre-mix step listing ingredients that are NOT matched to robot liquids. These ingredients SHALL be shown as manual preparation steps. The cocktail's full `preparation` text SHALL be shown as context. The user MUST explicitly acknowledge the pre-mix steps before the job is submitted.

#### Scenario: Non-dispensable ingredients shown as manual steps

- **WHEN** a cocktail ingredient has no matching robot liquid
- **THEN** it appears in the "Prepare manually" list with its amount
- **WHEN** the cocktail has a `garnish` value
- **THEN** it is shown in the post-mix step (not pre-mix)

#### Scenario: All ingredients dispensable

- **WHEN** every cocktail ingredient matches a robot liquid
- **THEN** the pre-mix step shows only the preparation text and "place glass" instruction

#### Scenario: User acknowledges pre-mix

- **WHEN** the user checks "Ready" on the pre-mix step
- **THEN** the "Mix!" submit button becomes enabled

### Requirement: Job submission

The system SHALL submit `POST /v1/dispense/jobs` with the correct payload when the user confirms. `items` SHALL contain only ingredients matched to robot liquids, using the resolved `liquid_id` and the recipe `amount` as `parts`. `name` SHALL be the cocktail name. `size` SHALL be the selected glass size id.

#### Scenario: Successful job submission

- **WHEN** the user clicks "Mix!" and `POST /v1/dispense/jobs` returns 201
- **THEN** `robot.activeJobId` is set to the returned `job_id`
- **THEN** the UI transitions to the dispensing progress view

#### Scenario: Job queue full (503)

- **WHEN** `POST /v1/dispense/jobs` returns 503
- **THEN** the UI shows "Robot is busy, please wait" and the button returns to enabled

#### Scenario: Ingredient to liquid_id resolution

- **WHEN** building the job payload for a recipe ingredient of type "Gin"
- **THEN** the system finds the bar entry with `type === "Gin"` and `source === "robot"`
- **THEN** looks up that ingredient's name in `robot.robotConfig.liquids` to get its `id`
- **THEN** uses that `id` as `liquid_id`

### Requirement: Dispensing progress view

The system SHALL show a modal/overlay with a progress bar driven by `job_update` SSE events while the robot state is `waiting_for_glass` or `working`.

#### Scenario: Waiting for glass

- **WHEN** `robot.robotState.state === "waiting_for_glass"`
- **THEN** the progress view shows "Place your glass on the robot" with an animated prompt

#### Scenario: Dispensing in progress

- **WHEN** `robot.robotState.state === "working"` with `progress_pct`
- **THEN** the progress bar reflects `progress_pct`

#### Scenario: Job update SSE drives progress

- **WHEN** a `job_update` SSE event is received with `job_id === robot.activeJobId`
- **THEN** the progress bar is updated to `progress_pct`

### Requirement: Post-mix instructions

When the robot state transitions to `drink_ready` the system SHALL display post-mix instructions: the cocktail's `garnish` field (if present) and any non-dispensable liquid ingredients that were skipped.

#### Scenario: Post-mix garnish shown

- **WHEN** `robot.robotState.state === "drink_ready"` and the cocktail has a garnish
- **THEN** the post-mix view shows "Add: [garnish]"

#### Scenario: Dismiss post-mix view

- **WHEN** the user dismisses the post-mix view
- **THEN** `robot.activeJobId` is cleared and the cocktail detail page returns to normal

### Requirement: Dispense error handling

The system SHALL show a clear error message when the robot enters the `error` state during an active job, including the error `message` and any `recovery` action hint.

#### Scenario: Robot error during dispensing

- **WHEN** `robot.robotState.state === "error"` while `robot.activeJobId` is set
- **THEN** the progress view shows the error message and recovery instruction
- **THEN** the "Make it!" button remains disabled until the robot returns to `idle`
