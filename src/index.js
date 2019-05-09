import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../assets/css/App.css";
import "../assets/css/Card.css";

var buttonStyle = {
  backgroundColor: "#4caf50",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px"
};

class ClueCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardText: props.children,
      clueIsShowing: false,
      showAnswerLink: false,
      answerIsShowing: false
    };

    this.showClue = this.showClue.bind(this);
    this.hideClue = this.hideClue.bind(this);
    this.showAnswerLink = this.showAnswerLink.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
  }

  showClue(e) {
    e.currentTarget.remove();

    this.setState({
      clueIsShowing: true
    });

    setInterval(() => this.showAnswerLink(), 1000);
  }

  hideClue() {
    this.setState({
      clueIsShowing: false
    });
  }

  showAnswerLink() {
    this.setState({
      showAnswerLink: true
    });
  }

  toggleAnswer() {
    if (!this.state.answerIsShowing) {
      this.setState({
        cardText: this.props.answer
      });
    } else {
      this.setState({
        cardText: this.props.children
      });
    }

    this.setState({
      answerIsShowing: !this.state.answerIsShowing
    });
  }

  render() {
    let valueClass = "large";
    if (this.props.value.length === 4) {
      valueClass = "medium";
    }

    let textClass = "small";
    if (this.state.cardText.length < 20) {
      textClass = "large";
    }

    return (
      <div className="clue-card">
        <button
          className={`clue-card__value ${valueClass}`}
          onClick={this.showClue}
        >
          <span className="dollar-sign">$</span>
          {this.props.value}
        </button>
        <div
          className={`clue-card__inner ${textClass} ${
            this.state.clueIsShowing ? "show" : "hidden"
          }`}
        >
          <div className="clue-card__inner-wrapper">
            <div className="clue-card__clue">{this.state.cardText}</div>
            <button
              className={`clue-card__answer-link ${
                this.state.showAnswerLink ? "" : "hidden"
              }`}
              onClick={this.toggleAnswer}
            >
              Answer
            </button>
            <button
              className={`clue-card__close-link ${
                this.state.showAnswerLink ? "" : "hidden"
              }`}
              onClick={this.hideClue}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function CategoryCard(props) {
  return (
    <div className="category-card">
      <div className="card__inner-text">{props.children}</div>
    </div>
  );
}

function Board(props) {
  const board = Object.keys(props.data).map(category => {
    return (
      <div className="column">
        <CategoryCard>{category}</CategoryCard>
        {Object.values(props.data[category]).map(card => (
          <ClueCard value={card.value} answer={card.answer}>
            {card.clue}
          </ClueCard>
        ))}
      </div>
    );
  });

  return <div className="board">{board}</div>;
}

function App() {
  const boardData = {
    Protocols: [
      {
        value: "200",
        clue:
          "It is the method by which data is sent from one computer to another on the internet.",
        answer: "What is Internet Protocol?"
      },
      {
        value: "400",
        clue:
          "It is the unsecure protocol used commonly to access a website through a web browser.",
        answer: "What is HTTP?"
      },
      {
        value: "600",
        clue: "It is an encryption layer on top on the HTTP protocol.",
        answer: "What is SSL/TLS?"
      },
      {
        value: "800",
        clue:
          "It a protocol commonly used to establish a secure communication over an unsecured network, typically to do a remote login.",
        answer: "What is SSH?"
      },
      {
        value: "1000",
        clue:
          "It is an obsolete alternative to the HTTPS protocol for encrypting web communications carried over HTTP.",
        answer: "What is S-HTTP?"
      }
    ],
    "Who's who?": [
      {
        value: "200",
        clue:
          "He is best known as the whistleblower behind the NSA surveillance revelations.",
        answer: "Who is Edward Snowden?"
      },
      {
        value: "400",
        clue:
          "He is the author of the book “Privacy and Freedom”, which helped to define the privacy field.",
        answer: "Who is Alan Furman Westin?"
      },
      {
        value: "600",
        clue:
          "He was widely regarded as one of the greatest con artists who was able to sell the Eiffel Tower twice.",
        answer: "Who is Victor Lustig?"
      },
      {
        value: "800",
        clue:
          "He was the King of Portugal from 1554 AD to 1578 AD that got his identity stolen.",
        answer: "Who is Dom Sebastian I?"
      },
      {
        value: "1000",
        clue: "He is the person who developed the “right to privacy” concept.",
        answer: "Who is Louis Brandeis?"
      }
    ],
    Arbitary: [
      {
        value: "200",
        clue:
          "It is a unique number given to a device in order to connect to the Internet?",
        answer: "What is an IP address?"
      },
      {
        value: "400",
        clue:
          "In the context of information security, it is the psychological manipulation of people into performing actions or divulging confidential information.",
        answer: "What is social engineering?"
      },
      {
        value: "600",
        clue:
          "It is the protection of persons’ bodies from interference by other persons or institutions.",
        answer: "What is individualism?"
      },
      {
        value: "800",
        clue:
          "It is an approach to life that involves doing things in groups, not on an individual basis.",
        answer: "What is collectivism?"
      },
      {
        value: "1000",
        clue:
          "In information security, it is when an attacker requests personal information from a party in exchange for something desirable. For example, “you scratch my back, and I’ll scratch yours”.",
        answer: "What is quid pro duo?"
      }
    ],
    "Know your rights?": [
      {
        value: "200",
        clue:
          "It protects people from unreasonable searches and seizures by law enforcement agencies, unless a warrant is issued.",
        answer: "What is the fourth amendment?"
      },
      {
        value: "400",
        clue:
          "It is a law enacted by President George W. Bush to allow government agencies to have “anti-privacy” powers to combat domestic terrorism.",
        answer: "What is the PATRIOT Act?"
      },
      {
        value: "600",
        clue:
          "It provides federal protections for personal health information.",
        answer:
          "What is the Health Insurance Portability and Accountability Act (HIPAA)?"
      },
      {
        value: "800",
        clue:
          "It is a United States federal law that requires financial institutions to explain how they share and protect their customers’ private information.",
        answer: "What is the Gramm-Leach-Bliley Act?"
      },
      {
        value: "1000",
        clue:
          "It is a law passed in 2002 that made it a requirement for federal agencies to develop, document, and implement an information security and protection program.",
        answer:
          "What is the Federal Information Security Management Act (FISMA)?"
      }
    ],
    "Behavioral Psychology": [
      {
        value: "200",
        clue:
          "It is the study of how people’s thoughts, feelings, and behaviors are influenced by the actual, imagined or implied presence of others.",
        answer: "What is social psychology?"
      },
      {
        value: "400",
        clue:
          "It is a form of social psychology that involves a person’s obligation to repay.",
        answer: "What is reciprocity?"
      },
      {
        value: "600",
        clue:
          "It is a form of social psychology that describes why the bystander effect exists.",
        answer: "What is social proof?"
      },
      {
        value: "800",
        clue:
          "It is a form of social psychology that describes how Joe Girard became the Greatest Car Salesman.",
        answer: "What is compliment?"
      },
      {
        value: "1000",
        clue: "It is the human tendency to apply human qualities to machines.",
        answer: "What is to anthropomorphize?"
      }
    ],
    "Easy Points": [
      {
        value: "200",
        clue:
          "They are digits assigned to every person in the United States, which can be used by an identity thief to open a bank account.",
        answer: "What is a Social Security Number?"
      },
      {
        value: "400",
        clue:
          "They are connected to the Internet and can have a variety of applications in the home.",
        answer: "What are IoT devices?"
      },
      {
        value: "600",
        clue:
          "These are the groups of people who are most concerned about privacy and believe that personal information is not handled securely by commercial organizations.",
        answer: "Who are Fundamentalists?"
      },
      {
        value: "800",
        clue:
          "It involves a person having access to an organization’s system but abuses their privileges.",
        answer: "What is an Insider Threat?"
      },
      {
        value: "1000",
        clue:
          "These are websites not indexed by web search engines, such as Google.",
        answer: "What is the Dark Web?"
      }
    ]
  };

  return (
    <div>
      <Board data={boardData} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
