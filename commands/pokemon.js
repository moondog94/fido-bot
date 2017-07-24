const Command = require('./command')
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()


String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

class Pokmeon extends Command {
    constructor(cmd, params) {
        super(cmd, params, '!fetch pokemon [Name or #]   Get Pokemon Info')
    }

    async runCommand() {
        try {
            if (this.params.length < 1)
                return 'Seems like I couldn\'t find that Pokémon :dog:'

            const id = this.params.join('')
            const pokeInfoPromise = P.getPokemonByName(id)
            const pokeSpeciesPromise = P.getPokemonSpeciesByName(id)
            const [pokeInfo, pokeSpecies] = await Promise.all([pokeInfoPromise, pokeSpeciesPromise])

            var types = pokeInfo.types.sort((a, b) => { return a.slot - b.slot }).map(a => { return a.type.name.capitalize(true) }).join('/')

            var info = `**#${pokeInfo.id} __${pokeInfo.name.toUpperCase()}__**\n`
            info += `${types}\n`
            info += `The ${pokeSpecies.genera[0].genus} Pokémon\n`
            info += `*"${pokeSpecies.flavor_text_entries[1].flavor_text.replace("\n", ' ')}"*\n`

            info += '__Abilities__:\t'
            const abilities = pokeInfo.abilities.sort((a, b) => {
                return a.slot - b.slot
            }).map(a => {
                if (a.is_hidden)
                    return a.ability.name.capitalize(true) + '*(Hidden Ability)*'
                else
                    return a.ability.name.capitalize(true)
            }).join(', ')
            info += `${abilities}\n`

            info += '__Egg Hatching Steps__: '
            const steps = 255 * (pokeSpecies.hatch_counter + 1)
            info += `${steps} Steps\n`

            info += `__Base Capture Rate__: ${pokeSpecies.capture_rate} *(Max number is 255. The higher the number, the easier it is to catch)*\n`

            info += '\n__**BASE STATS**__\n'
            pokeInfo.stats.forEach(s => {
                info += `**${s.stat.name.replace("-", " ").capitalize(true)}:** ${s.base_stat}\t`
            })

            info += '\n\n__**EFFORT VALUES**__\n'
            pokeInfo.stats.filter(s => {
                return (s.effort !== 0)
            }).forEach(s => {
                info += `**${s.stat.name.replace("-", " ").capitalize(true)}:** ${s.effort}\t`
            })

            info += `\n\n__*Serebii Page*__: <http://www.serebii.net/pokedex-sm/${pokeInfo.id}.shtml>\n`
            info += `__*Sprite*__: http://play.pokemonshowdown.com/sprites/xyani/${pokeInfo.name}.gif`

            return info
        } catch (e) {
            return 'Seems like I couldn\'t find that Pokémon :dog:'
        }
    }
};

module.exports = Pokmeon;