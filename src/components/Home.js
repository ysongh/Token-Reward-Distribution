import React from 'react';

function Home() {
  return (
    <div>
      <header className="background-primary">
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-md-6 text-light mb-5">
              <h1 className="home__title mt-4 mb-4">Save money on transaction fees</h1>
              <p className="mb-4">This web app used Horizon to have low transaction fees when distributing ERC20 from One Wallet to ETH Wallet</p>
              <button className="btn primary-color btn-lg">
                Start Distributing Token
              </button>
            </div>

            <div className="col-12 col-md-6">
              <img
                className="home__hero"
                src="/images/heroimage.svg"
                alt="Icon" />
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="my-5">
          <h2 className="display-4 text-center mb-5">Cost of Transfering ERC20</h2>

          <div className="row">
            <div className="col-12 col-md-6">
              <div className="card  mb-3">
                <div className="card-body">
                  <p className="home__cost1 text-center">ETH Wallet cost around $6-9</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <p className="home__cost2 text-center">One Wallet  cost a fraction of cent</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-5">
          <h2 className="display-4 text-center mb-5">Make distribution easy and cheap for you</h2>

          <div className="row">
            <div className="col-12 col-md-4">
              <img
                className="home__icon"
                src="/images/homeicon1.svg"
                alt="Icon" />
              <p className="home__icontext">
                A dashboard to manage a list of addresses to distribute
              </p>
            </div>

            <div className="col-12 col-md-4">
              <img
                className="home__icon"
                src="/images/homeicon2.svg"
                alt="Icon" />
              <p className="home__icontext">
                Very low transaction fees when distributing ERC20 to ETH Wallet using one wallet
              </p>
            </div>

            <div className="col-12 col-md-4">
              <img
                className="home__icon"
                src="/images/homeicon3.svg"
                alt="Icon" />
              <p className="home__icontext">
                It uses ONE instead of ETH for transaction fee
              </p>
            </div>
          </div>
        </section>

        <section className="my-5">
          <div className="home__required">
            <h3 className="text-center">
              Harmony ONE Wallet is Required
            </h3>
            <h3 className="text-center">
              You can download it from the Chrome Store
            </h3>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
