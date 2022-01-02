import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchCoin } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0 10px;
  max-width: 480px;
  margin: 0 auto;
  height: 100%;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: "Roboto", sanserif;
`;

const Error = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background:"whitesmoke"
  text:"#1111"
`;
const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 20px;
  border-radius: 15px;
  margin: 0 0 10px 0;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Loader = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Toggle = styled.button`
  position: absolute;
  right: 0;
  display: inline-block;
  background-color:transparent;
  border:none;
  height: 25px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:${(props) => props.theme.textColor};

  span{
    margin-right:1px;
    color:inherit;
  }

}
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading: loading, data: coins, error } = useQuery<ICoin[]>("allcoins", fetchCoin);
  const setDarkMode = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Container>
      <Header>
        <Title>Crypto Coin</Title>
        <Toggle onClick={toggleDarkMode}>
          <span>Mode</span>
          <input type="checkbox" checked={isDark} />
        </Toggle>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={`${coin.name}`} /> {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
