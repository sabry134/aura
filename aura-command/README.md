curl -fsSL https://raw.githubusercontent.com/sabry134/aura/refs/heads/main/aura-command/install.sh | sh
curl -fsSL https://raw.githubusercontent.com/sabry134/aura/refs/heads/main/aura-command/install.sh?timestamp=20250212 | sh



zip aura.zip aura && push "[ADD] server fix"


/aura restart → Restart the bot
/aura shutdown → Shut down the bot completely
/aura reload [module] → Reload a specific bot module (e.g., commands, events)
/aura eval [code] → Run raw JavaScript or Python code within the bot
/aura update → Pull the latest changes from GitHub and restart
/aura debug → Display internal bot debugging info
/aura status → Show bot uptime, memory usage, CPU load, and ping
/aura logs [lines] → Fetch the latest logs from the bot (default: 20 lines)
/aura errors → Show the latest errors and stack traces
/aura cache clear → Clear the bot’s cache
/aura memory → Show bot memory consumption
/aura setprefix [prefix] → Change the bot command prefix
/aura setstatus [status] → Set the bot’s presence (e.g., online, idle, dnd)
/aura setactivity [type] [message] → Set bot activity (Playing, Watching, Listening)
/aura disablecommand [command] → Disable a specific command globally
/aura enablecommand [command] → Re-enable a disabled command
/aura setowner @user → Assign a new bot owner
/aura block @user → Block a user from using bot commands
/aura unblock @user → Remove a user from the blocklist
/aura blacklistguild [guild_id] → Ban a server from using the bot
/aura whitelistguild [guild_id] → Remove a server from the blacklist
/aura webhook add [url] → Set up a webhook for bot logs or alerts
/aura webhook remove [url] → Remove a webhook from the bot
/aura api status → Check if external APIs the bot depends on are online
/aura db backup → Create a backup of the bot’s database
/aura db restore [file] → Restore the database from a backup
/aura db query [query] → Run a raw database query
/aura db stats → Show database size, total users, and guilds
/aura guilds → List all guilds the bot is in
/aura leaveguild [guild_id] → Make the bot leave a specific server
/aura userinfo @user → Fetch internal data about a user