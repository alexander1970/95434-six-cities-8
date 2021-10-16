import {useState} from 'react';
import {Offer} from '../../types/types';
import MainActiveCard from '../main-active-card/main-active-card';


type OffersListProps = {
  offers: Offer[];
}

function OffersList({offers}:OffersListProps):JSX.Element {
  const [activeOfferCard, setActiveOfferCard] = useState<Offer | null>(null);

  const handleActiveOfferSelect = (offer: Offer): void => {
    setActiveOfferCard(offer);
  };

  const handleNonActiveOfferSelect = (): void => {
    setActiveOfferCard(null);
  };

  return (
    <>
      {offers.map((offer) => (
        <MainActiveCard
          offer={offer}
          key={offer.id}
          onOfferSelected={handleActiveOfferSelect}
          onOfferNonSelected={handleNonActiveOfferSelect}
        />
      ))}
      <h2> иначе ругается на неиспользуемый activeOfferCard <br/>{activeOfferCard}</h2>
    </>
  );

}

export default OffersList;
