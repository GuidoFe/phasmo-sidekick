#!/bin/python3
import os
import json
import sys
from discord.ext import commands
from dotenv import load_dotenv
import random

os.chdir(os.path.dirname(os.path.abspath(sys.argv[0])))
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
bot = commands.Bot(command_prefix='!phas ')

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


class Help(commands.MinimalHelpCommand):
    async def send_pages(self):
        destination = self.get_destination()
        file = open("help.txt")
        helpMsg = file.read()
        file.close()
        await destination.send(helpMsg)
    
bot.help_command = Help()
@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

@bot.command(name='item')
async def item(ctx):
    response = random.choice(items)
    await ctx.send(response)

@bot.command(name='map')
async def map(ctx, *args):
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

@bot.command(name="challenge")
async def challenge(ctx, *args):
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

bot.run(TOKEN)
