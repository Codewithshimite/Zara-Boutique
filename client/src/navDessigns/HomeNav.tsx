

import styled from 'styled-components';

const Home = () => {
  return (
    <StyledWrapper>
      <div className="Home">
        <div className="box">H</div>
        <div className="box">o</div>
        <div className="box">m</div>
        <div className="box">e</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Home {
  display: flex;
  gap: -10%; 
  flex-direction: row;
}

.box {
  width: auto;
  padding: 0 4px; /* Add a little horizontal padding */
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  transition: all 0.8s;
  cursor: pointer;
  position: relative;
  background: rgb(149, 41, 41);
  overflow: hidden;
}

/* Only change this if each box represents one letter */
.box:before {
  content: "Z";
  position: absolute;
  top: 0;
  background: #0f0f0f;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
  transition: transform 0.4s;
}

.box:nth-child(2)::before {
  transform: translateY(-100%);
  content: 'a';
}

.box:nth-child(3)::before {
  content: 'r';
}

.box:nth-child(4)::before {
  transform: translateY(-100%);
  content: 'a';
}

.Home:hover .box:before {
  transform: translateY(0);
}`

export default Home;
