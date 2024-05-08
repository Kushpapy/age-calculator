import { useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 50rem;
  background-color: var(--white);
  border-radius: 11px;
  border-bottom-right-radius: 150px;
  padding: 2.4rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.075);
`;

const DateBox = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1.6rem;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  display: block;
  font-weight: 600;
  color: var(--smokey-grey);

  &.error {
    color: var(--light-red);
  }
`;
const InputBox = styled.div``;

const Input = styled.input`
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--light-grey);
  width: 80%;
  color: var(--off-black);
  font-size: 2.4rem;
  font-weight: 600;
  border-radius: 5px;
  background-color: var(--white);
  transition: 0.3s all ease;
  &:focus {
    outline: none;
  }

  &.error {
    border: 1px solid var(--light-red);
  }
`;

const SvgBox = styled.div`
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 50%;
  background-color: var(--purple);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all ease-in;

  &:hover {
    background-color: var(--off-black);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  & hr {
    display: inline-block;
    width: 85%;
    height: 0;
    border: 1px solid var(--off-white);
  }
`;

const OutputBox = styled.div``;

const Output = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-size: 3.2rem;
  font-weight: 800;
`;

const H1 = styled.h1``;

const Dashes = styled.h2`
  display: block;
  font-weight: 800;
  font-size: 3.2rem;
  color: var(--purple);
`;

const P = styled.p`
  color: var(--light-red);
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-top: 0.25rem;
`;

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [age, setAge] = useState(null);

  const dob = new Date(year + "-" + month + "-" + day);

  const calculateAge = () => {
    try {
      if (dob > new Date() || Number(day) > 31 || Number(month) > 12) {
        throw new Error("Invalid date of birth.");
      }
      setDateOfBirth(dob);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }

    if (!dateOfBirth) {
      return;
    }

    const today = new Date();
    let years = today.getFullYear() - dateOfBirth.getFullYear();

    let months = today.getMonth() - dateOfBirth.getMonth();
    if (today.getDate() < dateOfBirth.getDate()) {
      months--; // Haven't had birthday this month, so subtract a month
    }

    // Handle case where current month has fewer days than birth month
    const daysInBirthMonth = new Date(
      today.getFullYear(),
      dateOfBirth.getMonth(),
      0
    ).getDate();
    let days = today.getDate() + (daysInBirthMonth - dateOfBirth.getDate());
    if (months < 0) {
      months += 12; // Borrowed a month from previous year
      years--;
    }

    // Adjust days for borrowing from previous month
    if (days > daysInBirthMonth) {
      days -= daysInBirthMonth;
    }

    setAge({ years, months, days });
  };

  console.log(errorMessage);

  return (
    <StyledContainer>
      <DateBox>
        <InputBox>
          <Label htmlFor="day" className={Number(day) > 31 ? "error" : ""}>
            Day
          </Label>
          <Input
            id="day"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value.trim())}
            className={Number(day) > 31 ? "error" : ""}
          ></Input>
          {Number(day) > 31 && <P>must be a valid day</P>}
        </InputBox>
        <InputBox>
          <Label htmlFor="month" className={Number(month) > 12 ? "error" : ""}>
            Month
          </Label>
          <Input
            id="month"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value.trim())}
            className={Number(month) > 12 ? "error" : ""}
          ></Input>
          {Number(month) > 12 && <P>must be a valid month</P>}
        </InputBox>
        <InputBox>
          <Label
            htmlFor="year"
            className={Number(year) > new Date().getFullYear() ? "error" : ""}
          >
            Year
          </Label>
          <Input
            id="year"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value.trim())}
            className={Number(year) > new Date().getFullYear() ? "error" : ""}
          ></Input>
          {Number(year) > new Date().getFullYear() && (
            <P>must be a in the past</P>
          )}
        </InputBox>
      </DateBox>
      <ButtonContent>
        <hr />
        <SvgBox>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
            onClick={calculateAge}
          >
            <g fill="none" stroke="#fff" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </SvgBox>
      </ButtonContent>
      <OutputBox>
        <Output>
          <Dashes>{age?.years ?? "- -"}</Dashes>
          <H1>{age?.years > 1 ? "years" : "year"}</H1>
        </Output>
        <Output>
          <Dashes>{age?.months ?? "- -"}</Dashes>
          <H1>{age?.months > 1 ? "months" : "month"}</H1>
        </Output>
        <Output>
          <Dashes>{age?.days ?? "- -"}</Dashes>
          <H1>{age?.days ? "days" : "day"}</H1>
        </Output>
      </OutputBox>
    </StyledContainer>
  );
}

export default App;
