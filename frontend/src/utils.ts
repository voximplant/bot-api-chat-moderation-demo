// logging util function
export const log = (...args: any[]) => {
  console.log(`%cDEMO%c ${new Date().toUTCString().slice(17, 25)}:`, 'padding: 2px 4px; background-color: #662EFF; color: #FFFFFF; border-radius: 4px', 'color: #662EFF', ...args);
};

export const logError = (...args: any[]) => {
  console.log(`%cERROR%c ${new Date().toUTCString().slice(17, 25)}:`, 'padding: 2px 4px; background-color: #F03E3E; color: #FFFFFF; border-radius: 4px', 'color: #F03E3E', ...args);
};

export const logHelp = (...args: any[]) => {
  console.log(`%cHELP%c ${new Date().toUTCString().slice(17, 25)}:`, 'padding: 2px 4px; background-color: #329AF0; color: #FFFFFF; border-radius: 4px', 'color: #329AF0', ...args);
};
