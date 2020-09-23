import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

export default class InverseColorEffect extends Effect {
	/**
	 * @param {BlendFunction} [blendFunction=BlendFunction.NORMAL] - The blend function of this effect.
	 */
	constructor({
        active = true,
        blendFunction = BlendFunction.NORMAL
    }) {
        super("InverseColorEffect", `
            uniform bool active;

            void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
                if(active) {
                    outputColor = vec4(1.0 - inputColor.rgb, inputColor.a);
                } else {
                    outputColor = inputColor;
                }
            }
        `, {
            blendFunction,
			uniforms: new Map([
				["active", new Uniform(active)],
			])
        });
    }
    
    /**
	 * The InverseColor active.
	 *
	 * @type {Boolean}
	 */

	get active() {

		return this.uniforms.get("active").value;

	}

	/**
	 * Sets the InverseColor active.
	 *
	 * @type {Boolean}
	 */

	set active(value) {

		this.uniforms.get("active").value = value;

	}


}