import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

/*
 * Codes:
 * 0: Line Break / Spacer
 * 1: Support Agent Message
 * 2: Support Agent Link
 * 3: User Message
 */

function SupportAgent() {
  const answers = {
    init: [
      '1Please let me know how I may assist you today:',
      '0',
      '2I\'ve lost all my money.',
      '2Could I get a refund?',
      '2How do I log in?',
    ],
    Yes: [
      '1Please let me know how I may assist you today:',
      '0',
      '2I\'ve lost all my money.',
      '2Could I get a refund?',
      '2How do I log in?',
    ],
    'I\'ve lost all my money.': [
      '1We\'re terribly sorry to hear that!',
      '1Clicking on "balance" at the top of your screen will allow you to purchase more tokens.',
      '0',
      '1Is there anything else I may help you with?',
      '0',
      '2Yes',
    ],
    'Could I get a refund?': [
      '1Unfortunately we do not offer refunds at this time.',
      '1But who knows, your big win might be right around the corner!',
      '1Clicking on "balance" at the top of your screen will allow you to purchase more tokens.',
      '0',
      '1Is there anything else I may help you with?',
      '0',
      '2Yes',
    ],
    'How do I log in?': [
      '1On the top of your screen you\'ll be able to log in or sign up by clicking on the respective button.',
      '0',
      '1After that, clicking on "balance" at the top of your screen will allow you to purchase tokens.',
      '0',
      '1Is there anything else I may help you with?',
      '0',
      '2Yes',
    ],
  };

  const [msgHistory, setMsgHistory] = useState([
    '1Hey there! 👋 My name is Alice.',
  ].concat(answers.init));

  const scrollContainer = useRef(null);

  useEffect(() => {
    if (scrollContainer) {
      console.log('scrolling');
      scrollContainer.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgHistory, scrollContainer]);

  const answerQuestion = (question) => {
    setMsgHistory(msgHistory.concat('0', `3${question}`, '0', answers[question]));
  };

  return (
    <SupportAgentContainer>
      {msgHistory.map((msg) => {
        const code = msg[0];
        const message = msg.slice(1);
        if (code === '0') {
          return <Spacer />;
        }
        if (code === '1') {
          return <SupportText>{message}</SupportText>;
        }
        if (code === '2') {
          return (
            <Question
              onClick={() => { answerQuestion(message); }}
            >
              {message}
            </Question>
          );
        }
        if (code === '3') {
          return <UserText>{message}</UserText>;
        }
      })}
      <div
        ref={scrollContainer}
      />
    </SupportAgentContainer>
  );
}

const SupportAgentContainer = styled.div`
  background-color: white;
  width: 450px;
  height: 500px;
  overflow-y: scroll;
  padding: 25px;
`;

const TextUniversal = styled.p`
  width: min(80%);
  margin: 5px 0;
  color: black;
  height: min(20px, fit-content);
`;

const Spacer = styled.div`
  height: 20px;
`;

const SupportText = styled(TextUniversal)`
`;

const UserText = styled(TextUniversal)`
  margin-left: auto;
  width: fit-content;
  font-weight: bold;
`;

const Question = styled(TextUniversal)`
  cursor: pointer;
  color: blue;

  &:hover {
    text-decoration: underline;
  }
`;

export default SupportAgent;
