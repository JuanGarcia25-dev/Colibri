import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Heading, Input } from "../components";
import axios from "axios";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Console from "../utils/console";

function CaptainSignup() {
  const [responseError, setResponseError] = useState("");
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigation = useNavigate();
  const signupCaptain = async (data) => {
    const captainData = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
      phone: data.phone,
      vehicle: {
        color: data.color,
        number: data.number,
        capacity: data.capacity,
        type: data.type,
      },
    };
    Console.log(captainData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/captain/register`,
        captainData
      );
      Console.log(response);
      localStorage.setItem("token", response.data.token);
      navigation("/captain/home");
    } catch (error) {
      setResponseError(
        error.response.data[0]?.msg || error.response.data.message
      );
      setShowVehiclePanel(false);
      Console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setResponseError("");
    }, 5000);
  }, [responseError]);

  return (
    <div className="w-full h-dvh flex flex-col justify-between p-4 pt-6">
      <div>
        <Heading title={"Registro de Conductor"} />

        <form onSubmit={handleSubmit(signupCaptain)}>
          {!showVehiclePanel && (
            <>
              <div className="flex gap-4 -mb-2">
                <Input
                  label={"Nombre"}
                  name={"firstname"}
                  register={register}
                  error={errors.firstname}
                />
                <Input
                  label={"Apellido"}
                  name={"lastname"}
                  register={register}
                  error={errors.lastname}
                />
              </div>

              <Input
                label={"Número de teléfono"}
                type={"number"}
                name={"phone"}
                register={register}
                error={errors.phone}
              />

              <Input
                label={"Correo electrónico"}
                type={"email"}
                name={"email"}
                register={register}
                error={errors.email}
              />

              <Input
                label={"Contraseña"}
                type={"password"}
                name={"password"}
                register={register}
                error={errors.password}
              />

              {responseError && (
                <p className="text-sm text-center mb-4 text-red-500">
                  {responseError}
                </p>
              )}

              <div
                className={`cursor-pointer flex justify-center items-center gap-2 py-3 font-semibold bg-black text-white w-full rounded-lg`}
                onClick={() => {
                  setShowVehiclePanel(true);
                }}
              >
                Siguiente <ChevronRight strokeWidth={2.5} />
              </div>
            </>
          )}

          {showVehiclePanel && (
            <>
              <ArrowLeft
                onClick={() => {
                  setShowVehiclePanel(false);
                }}
                className="cursor-pointer -ml-1 mb-4"
              />

              <div className="flex gap-4 -my-2">
                <Input
                  label={"Color del vehículo"}
                  name={"color"}
                  register={register}
                  error={errors.color}
                />
                <Input
                  label={"Capacidad del vehículo"}
                  type={"number"}
                  name={"capacity"}
                  register={register}
                  error={errors.capacity}
                />
              </div>

              <Input
                label={"Número del vehículo"}
                name={"number"}
                register={register}
                error={errors.number}
              />

              <Input
                label={"Tipo de vehículo"}
                type={"select"}
                options={["Car", "Bike", "Auto"]}
                name={"type"}
                register={register}
                error={errors.type}
              />

              {responseError && (
                <p className="text-sm text-center mb-4 text-red-500">
                  {responseError}
                </p>
              )}

              <Button title={"Registrarse"} loading={loading} type="submit" />
            </>
          )}
        </form>

        <p className="text-sm font-normal text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/captain/login"} className="font-semibold">
            Iniciar sesión
          </Link>
        </p>
      </div>

      <div>
        <Button
          type={"link"}
          path={"/signup"}
          title={"Registrarse como Usuario"}
          classes={"bg-green-500"}
        />

        <p className="text-xs font-normal text-center self-end mt-6">
          Este sitio está protegido por reCAPTCHA y aplican las{" "}
          <span className="font-semibold underline">Políticas de Privacidad</span> y{" "}
          <span className="font-semibold underline">Términos de Servicio</span>{" "}
          de Google.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
