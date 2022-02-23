import styled from 'styled-components'
import { Grid, LinearProgress } from '@material-ui/core'
import Cher from './components/Cher'
import React, { useState } from 'react'
import './App.css';
import GlobalStyle from './styles/globalStyle'
import { getTweet } from './lib/getTweet'

function App() {
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [showCher, setShowCher] = useState(true);

  const [showTweetBox, setShowTweetBox] = useState(false);
  const [tweetLoading, setTweetLoading] = useState(false);

  const [tweet, setTweet] = useState(null)
  const [error, setError] = useState(false);

  async function handleGenerateButtonClick() {
    setShowGenerateButton(false);
    setShowCher(false);
    setShowTweetBox(true);
    setTweetLoading(true);

    handleFetchTweet();
  }

  const handleFetchTweet = async() => {
    const response = await getTweet();
    if(response.body){
      setTweet(response.body.tweet);
      setTweetLoading(false);
    } else {
      setError(true);
      setTweetLoading(false);
    }
  }

  return (
    <div>
      <GlobalStyle />
      <Grid container direction="row">
        <Grid container item direction="column" xs={12} lg={6} spacing={8}>
          <Grid item>
            <Title>The Tweet Goes On</Title>
            <Subtitle>Cher’s twitter basically sounds like an AI. Now, it is one. Hit that button.</Subtitle>
            { showGenerateButton && <GenerateButton onClick={handleGenerateButtonClick}>generate</GenerateButton> }
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={12} md={6}>
          <Grid item>
            { showCher && <Cher /> }
          </Grid>
        </Grid>
      </Grid>
      {showTweetBox && tweetLoading && 
          <TweetInterface>
            <LoadingContainer>
              <Loader color="primary" />
              <LoadingText>overlaying autotune...</LoadingText>
            </LoadingContainer>
          </TweetInterface>
        }

        {
          showTweetBox && !tweetLoading && tweet && !error &&
          <TweetInterface>
            <TweetIcon src="/photos/cherIcon.png"/>
            <TweetContainer>
              <Username>cher</Username>
              <Tweet>{tweet}</Tweet>
              <RegenerateButton onClick={handleGenerateButtonClick}>regenerate</RegenerateButton>
            </TweetContainer>
          </TweetInterface>  
        }

        {
          showTweetBox && !tweetLoading && error &&
          <TweetInterface>
            <LoadingContainer>
              <ErrorText>
                An error has occurred. Please try again later.
              </ErrorText>
            </LoadingContainer>
            <RegenerateButton onClick={handleGenerateButtonClick}>regenerate</RegenerateButton>
          </TweetInterface>
        }
      <MadeByContainer>
        <NameSubtitle>made by </NameSubtitle>
        <NameLink href="https://www.emmabhoward.com">emma</NameLink>
      </MadeByContainer>
      <MadeByContainer>
      <FontSubtitle>Outward font designed by Raoul Audouin, provided by VTF</FontSubtitle>
      </MadeByContainer>
    </div>
  )
}

const Title = styled.div`
  font-size:150px;
  font-family:"outward";
  font-style:italic;
  color:#BACAD2;
  letter-spacing: 0.02em;
  margin-top:45px;
  padding-left:60px;

  @media only screen and (max-width:730px) {
    font-size: 90px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
  }
`

const Subtitle = styled.div`
  font-size:25px;
  color:#BACAD2;
  letter-spacing: 2%;
  margin-top: 0.1em;
  padding-left:60px;

  @media only screen and (max-width:730px) {
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const LoadingText = styled.div`
  font-size:24px;
  color:#BACAD2;
  letter-spacing: 2%;
  margin-top: 0.5em;

  @media only screen and (max-width: 700px) {
    font-size: 18px;
  }
`

const ErrorText = styled(LoadingText)`
  color:#f00001;
`

const GenerateButton = styled.button`
  background-color:#428FB6;
  width:440px;
  height:110px;
  border-radius: 50px;
  margin-left: 60px;
  margin-top: 60px;
  color:white;
  font-size:96px;
  font-family:"outward";
  letter-spacing: 0.03em;
  text-align: center;
  line-height: 110px;
  outline: none;

  @media only screen and (max-width:730px) {
    position: static;
    height: 75px;
    max-width: 300px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 75px;
    line-height: 65px;;

  }
  @media only (min-width:731px) {
    position: absolute;
    top: 50%;
    left: 15%;
  }
`
const TweetInterface = styled.div`
  width: 900px;
  height: 400px;
  background-color: #23293A;
  border-color: #428FB6;
  margin: 0 auto;
  border-width: 5px;
  border-style: solid;
  border-radius: 5px;
  padding: 48px;
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 24px;

  @media only screen and (max-width:1100px) {
    width: 75%;
    margin-bottom: 10px;
    min-height: 200px;
    height: auto;
  }

  @media only screen and (max-width: 700px) {
    position: static;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 20px;
    transform: translate(0%, 0%);
    min-width: 300px;
  }
`
const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width:700px) {
    min-width: 75%;
  }

  @media only screen and (max-width:400px) {
    min-width: 100px;
  }
`

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Loader = styled(LinearProgress)`
  barColorPrimary: #428fb6;
`

const TweetIcon = styled.img`
  max-width: 150px;
  max-height: 150px;
  height: auto;
  width: 100%;
  margin-right: 24px;

  @media only screen and (max-width: 1100px) {
    max-width: 90px;
    max-height: 90px;
  }

`
const Username = styled.div`
  font-size:100px;
  font-family:"outward";
  font-style:italic;
  color:#BACAD2;
  letter-spacing: 0.02em;

  @media only screen and (max-width: 700px) {
    font-size: 75px;
  }
`
const Tweet = styled.div`
  font-size:24px;
  color:#BACAD2;
  letter-spacing: 2%;

  @media only screen and (max-width: 700px) {
    font-size: 18px;
  }
`

const RegenerateButton = styled.button`
  font-family: Inconsolata, monospace;
  font-style: bold;
  font-size: 32px;
  position: static;
  text-align: right;
  color: #428fb6;
  background-color: transparent;
  border: none;
  outline: none;
  margin-top: auto;

  @media only screen and (max-width: 1100px) {
    position: static;
    text-align: right;
  }

  @media only screen and (max-width: 700px) {
    font-size: 18px;
  }
`
const MadeByContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
  width: 90%;
  margin-left: 10px;
  padding-right: 20px;
  position: static;

  @media only screen and (max-width: 730px) {
    justify-content:flex-start;
    width: 50%;
    padding-right: 0px;
  }
`
const NameSubtitle = styled(Subtitle)`
  text-align: right;
  justify-self: flex-end;
`

const FontSubtitle = styled(Subtitle)`
  text-align: right;
  font-size: 14px;
  margin-bottom: 20px;

  @media only screen and (max-width: 730px) {
    text-align: left;
    padding-right: 0px;
  }
`
const NameLink = styled.a`
  color:#428FB6;
  text-align: right;
  font-size: 25px;
  justify-self: flex-end;
  margin-left: 10px;

  @media only screen and (max-width:730px) {
    font-size: 18px;
    margin-left: 4px;
  }
`

export default App;
