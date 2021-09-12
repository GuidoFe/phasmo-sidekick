#!/bin/python3
import os
import json
import sys
import copy
import discord
from discord.ext import commands
from dotenv import load_dotenv
import random

os.chdir(os.path.dirname(os.path.abspath(sys.argv[0])))
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
bot = commands.Bot(command_prefix='!phas ')
f = open("help.json")
helpMsg = json.loads(f.read())
f.close()
items=["Spirit box", "Book", "Photo Camera", "EMF", "Video Camera", "UV Flashlight", "D.O.T.S.", "Candle", "Crucifix", "Glow Stick", "Head Mounted Camera", "Motion Sensor", "Lighter", "Parabolic Mic", "Salt", "Pills", "Smudge Stick", "Sound Sensor", "Strong Flashlight", "Thermometer", "Tripod"]

maps={
    "t": "Tanglewood",
    "e": "Edgefield",
    "w": "Willow",
    "r": "Ridgeview",
    "g": "Grafton",
    "b": "Bleasdale",
    "h": "Highschool",
    "p": "Prison",
    "a": "Asylum"
}

clue_n={"emf": 0, "emf5": 0, "book":1, "writing":1, "ghostwriting":1, "fingerprints":2, "fingers":2, "spirit":3, "spiritbox":3, "orbs":4, "ghostorbs":4, "freezing":5, "temps":5, "dots":6}

n_clue=["EMF 5", "Ghost writing", "Fingerprints", "Spiritbox", "Ghost orbs", "Freezing", "D.O.T.S."]

ghosts={
        "Spirit": [0, 1, 3],
        "Wraith": [0, 3, 6],
        "Phantom": [2, 3, 6],
        "Poltergeist": [1, 2, 3],
        "Banshee": [2, 4, 6],
        "Jinn": [0, 2, 5],
        "Mare": [1, 3, 4],
        "Revenant": [1, 4, 5],
        "Shade": [0, 1, 5],
        "Demon": [1, 2, 5],
        "Yurei": [4, 5, 6],
        "Oni": [0, 5, 6],
        "Yokai": [3, 4, 6],
        "Hantu": [2, 4, 5],
        "Goryo": [0, 2, 6],
        "Myling": [0, 1, 2]
        }

challenges=dict()
for entry in os.scandir("challenges"):
    f=open(entry.path)
    ob = json.loads(f.read())
    f.close()
    if ob["hasWheel"]:
        newList=[]
        for i in list(ob["wheel"].keys()):
            if ob["hasDuplicates"]:
                for n in range(ob["wheel"][i]["n"]):
                    newList.append(i)
            else:
                newList.append(i)
        ob["pool"]=newList
    challenges[ob["code"]]=ob

class PrettyHelp(commands.MinimalHelpCommand):
    def get_command_signature(self, command):
        s = '**%s%s**' % (self.clean_prefix, command.qualified_name)
        if command.signature:
            s += ' *%s*' % (command.signature)
        if command.brief:
            s += ': %s' % (command.brief)
        return s+'\n'

    async def send_bot_help(self, mapping):
        embed = discord.Embed(title="Help")
        for cog, commands in mapping.items():
            filtered = await self.filter_commands(commands, sort=True)
            command_signatures = [self.get_command_signature(c) for c in filtered]
            if command_signatures:
                cog_name = getattr(cog, "qualified_name", "✳️ General")
                embed.add_field(name=cog_name, value="\n".join(command_signatures), inline=False)

        channel = self.get_destination()
        await channel.send(embed=embed)

bot.help_command = PrettyHelp()

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

class RandomizersCog(commands.Cog, name="🎲 Randomizers"):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='item', brief=helpMsg["item"]["brief"])
    async def item(self, ctx):
        response = random.choice(items)
        await ctx.send(response)

    @commands.command(name='map', brief=helpMsg["map"]["brief"], usage="maps...", help=helpMsg["map"]["long"])
    async def map(self, ctx, *args):
        if not args:
            await ctx.send(random.choice(list(maps.values())))
        else:
            l = []
            for i in args:
                if i not in maps:
                    await ctx.send("Error: " + i + " is not a valid map")
                    return
                l.append(maps[i])
            response = random.choice(l)
            await ctx.send(response)

class FunCog(commands.Cog, name="🕹️ Fun Stuff"):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name="challenge", brief=helpMsg["challenge"]["brief"], usage="challenge_name", help=helpMsg["challenge"]["long"])
    async def challenge(self, ctx, *args):
        if len(args)==0:
            response = random.choice(list(challenges.keys()))
            await ctx.send(challenges[response]["name"])
        elif args[0] in list(challenges.keys()):
            challenge = challenges[args[0]]
            if challenge["hasWheel"]:
                itemName = random.choice(challenge["pool"])
                item = challenge["wheel"][itemName]
                if challenge["hasDuplicates"]:
                    await ctx.send("**" + itemName + "**: " + item["desc"])
                else:
                    await ctx.send("**" + itemName + "**: " + item)
            else:
                await ctx.send("No wheel to spin")
        else:
            await ctx.send("Error: challenge not valid")

class UtilityCog(commands.Cog, name="👻 Utilities"):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name="clues", brief=helpMsg["clues"]["brief"], usage="evidence...", help=helpMsg["clues"]["long"])
    async def clues(self, ctx, *args):
        if args:
            currentProofs = []
            for clue in args:
                if clue in clue_n:
                    currentProofs.append(clue_n[clue])
                else:
                    await ctx.send("Error: " + clue + " is not a valid evidence")
                    return
            pool = copy.deepcopy(ghosts)
            for clue in currentProofs:
                toDelete=[]
                for ghost in pool:
                    if clue not in pool[ghost]:
                        toDelete.append(ghost)
                    else:
                        pool[ghost].remove(clue)
                for ghost in toDelete:
                    del pool[ghost]
            if pool:
                m="Possible ghosts:\n" 
                for ghost in pool:
                    m += "**" + ghost + "**: "
                    for i, proof in enumerate(pool[ghost]):
                        m += n_clue[proof] 
                        if i != len(pool[ghost]) - 1:
                            m += ", "
                        else:
                            m += "\n"
                await ctx.send(m)
            else:
                await ctx.send("No ghost is possible with those evidence")
        else:
            await ctx.send("You have to specify some clues")

bot.add_cog(RandomizersCog(bot))
bot.add_cog(UtilityCog(bot))
bot.add_cog(FunCog(bot))
bot.run(TOKEN)
