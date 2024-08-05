import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Race from "./Race";
import Timer from "../Timer/Timer";
import { RaceProps } from "./Race.types";
import moment from "moment";

// Mock the Timer component
jest.mock("../Timer/Timer", () => () => <div>Mock Timer</div>);

describe("Race Component", () => {
  const defaultProps: RaceProps = {
    meetingName: "Meeting 1",
    raceNumber: "1",
    advertisedStart: moment().add(10, "minutes").toISOString(), // Or use moment object directly
  };

  test("renders Race component with correct props", () => {
    render(<Race {...defaultProps} />);

    expect(screen.getByText("Meeting 1")).toBeInTheDocument();
    expect(screen.getByText("Race Number: 1")).toBeInTheDocument();
    expect(screen.getByText("Starts In: Mock Timer")).toBeInTheDocument();
  });

  test("parses advertisedStart correctly as string", () => {
    render(<Race {...defaultProps} />);

    expect(screen.getByText("Starts In: Mock Timer")).toBeInTheDocument();
  });

  test("parses advertisedStart correctly as moment object", () => {
    const momentProps: RaceProps = {
      ...defaultProps,
      advertisedStart: moment().add(10, "minutes"), // Use moment object directly
    };

    render(<Race {...momentProps} />);

    expect(screen.getByText("Starts In: Mock Timer")).toBeInTheDocument();
  });
});
