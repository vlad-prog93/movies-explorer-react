export const convertTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    if (hours) {
      return `${hours}ч ${minutes}м`
    }
    return `${minutes}м`
  }