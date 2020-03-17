
const request = require('node-superfetch');
const { list, today, tomorrow } = require('../util/Util');
const { GOOGLE_KEY, GOOGLE_CALENDAR_ID, PERSONAL_GOOGLE_CALENDAR_ID } = process.env;

exports.run = async (client, message, args) => {
		try {
            
			const events = [];
			const standardEvents = await fetchHolidays(GOOGLE_CALENDAR_ID);
			if (standardEvents) events.push(...standardEvents);
			if (PERSONAL_GOOGLE_CALENDAR_ID) {
				const personalEvents = await fetchHolidays(PERSONAL_GOOGLE_CALENDAR_ID);
				if (personalEvents) events.push(...personalEvents);
			}
			if (!events.length) return message.channel.send('There are no holidays today...');
			const holidays = list(events.map(event => `**${event}**`));
            return message.channel.send(`Today${events.length === 1 ? ' is' : `'s holidays are`} ${holidays}!`);
            
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
        async function fetchHolidays(id) {
            try {
                const { body } = await request
                    .get(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events`)
                    .query({
                        maxResults: 20,
                        orderBy: 'startTime',
                        singleEvents: true,
                        timeMax: tomorrow().toISOString(),
                        timeMin: today().toISOString(),
                        timeZone: 'UTC',
                        key: GOOGLE_KEY
                    });
                if (!body.items.length) return null;
                return body.items.map(holiday => holiday.summary);
            } catch (err) {
                if (err.status === 404) return null;
                throw err;
            }
        }

        
	}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['holidays', 'events'],
    permLevel: "User"
  };

  exports.help = {
    name: 'calendar',
    description: 'Responds with today\'s holidays.',
    usage: "calendar",
    category: "Fun",
  };