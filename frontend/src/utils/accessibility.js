export const handleEnterKey = (event, callback) => {
  if (event.keyCode === 13 || event.key === 'ENTER') {
    return callback();
  }
};
