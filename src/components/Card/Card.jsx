import classes from './Card.module.scss';

const Card = ({ ticket }) => {
  const { price, carrier, segments } = ticket;

  const [firstSegment, secondSegment] = segments;

  const changeDurationFormat = (time) => {
    const hours = Math.floor(time / 60);
    const remainingMinutes = time % 60;

    return `${hours}ч ${remainingMinutes}м`;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const departureHours = date.getUTCHours();
    const departureMinutes = date.getUTCMinutes();
    const arrivalTime = new Date(date.getTime());
    arrivalTime.setUTCMinutes(arrivalTime.getUTCMinutes() + date.getTimezoneOffset());
    const arrivalHours = arrivalTime.getUTCHours();
    const arrivalMinutes = arrivalTime.getUTCMinutes();

    return `${departureHours.toString().padStart(2, '0')}:${departureMinutes
      .toString()
      .padStart(2, '0')} - ${arrivalHours.toString().padStart(2, '0')}:${arrivalMinutes
      .toString()
      .padStart(2, '0')}`;
  }
  function transferLengthchanger(transfers) {
    if (!transfers.length) {
      return 'Без пересадок';
    }
    if (transfers.length === 1) {
      return '1 пересадка';
    }
    return `${transfers.length} пересадки`;
  }

  return (
    <li className={classes.card}>
      <div className={classes['container-title']}>
        <span className={classes['container-title__price']}>{price} &#8381;</span>
        <img
          className={classes.logo}
          src={`https://pics.avs.io/99/36/${carrier}.svg`}
          alt={`${carrier} Airlines logo`}
        />
      </div>
      {/* 1 колонка */}
      <div className={classes['card__wrapper']}>
        <div className={classes['flight-info']}>
          <span className={classes['flight-info__title']}>
            {firstSegment.origin} – {firstSegment.destination}
          </span>
          <span className={classes['flight-info__content']}>{formatDate(firstSegment.date)}</span>
          <span className={classes['flight-info__title']}>
            {secondSegment.origin} – {secondSegment.destination}
          </span>
          <span className={classes['flight-info__content']}>{formatDate(secondSegment.date)}</span>
        </div>
        {/* 2 колонка */}
        <div className={classes['flight-info']}>
          <span className={classes['flight-info__title']}>в пути</span>
          <span className={classes['flight-info__content']}>
            {changeDurationFormat(firstSegment.duration)}
          </span>
          <span className={classes['flight-info__title']}>в пути</span>
          <span className={classes['flight-info__content']}>
            {changeDurationFormat(secondSegment.duration)}
          </span>
        </div>
        {/* 3 колонка */}
        <div className={classes['flight-info']}>
          <span className={classes['flight-info__title']}>
            {transferLengthchanger(firstSegment.stops)}
          </span>
          <span className={classes['flight-info__content']}>
            {firstSegment.stops.join(', ') ? firstSegment.stops.join(', ') : '—'}
          </span>
          <span className={classes['flight-info__title']}>
            {transferLengthchanger(secondSegment.stops)}
          </span>
          <span className={classes['flight-info__content']}>
            {secondSegment.stops.join(', ') ? secondSegment.stops.join(', ') : '—'}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Card;
