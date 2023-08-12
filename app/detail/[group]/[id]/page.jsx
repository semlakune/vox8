"use client";
import useDetail from "@/api/useDetail";
import { Navbar } from "@/components/Navbar/Navbar";
import useSimilar from "@/api/useSimilar";
import Scroller from "@/components/Scroller";
import styled from "styled-components";
import Image from "next/image";
import NotFound from "@/components/NotFound";
import { useEffect, useState } from "react";
import getContrastColor from "@/lib/getContrastColor";
import {Skeleton} from "@/components/ui/skeleton";

const DetailPage = ({ params }) => {
  const { group, id } = params;
  const { dataDetail, isErrorDetail, isLoadingDetail } = useDetail(group, id);
  const { dataSimilar, isErrorSimilar, isLoadingSimilar } = useSimilar(
    group,
    id,
  );

  const [dominantColor, setDominantColor] = useState(null);
  const [contrastColor, setContrastColor] = useState('white');

  useEffect(() => {
    if (dataDetail?.poster) {
      const getDominantColor = async () => {
        const response = await fetch(
            process.env.NEXT_PUBLIC_VOX8_API +
            `/getDominantColor?imagePath=${dataDetail?.poster}`,
        );
        const result = await response.json();
        return result.dominantColor;
      };

      getDominantColor().then((color) => {
        setDominantColor(color);
        setContrastColor(getContrastColor(color || [255, 255, 255]));
      });
    }
  }, [dataDetail?.poster]);


  return (
    <>
      <Navbar />
      {dataDetail?.message === "Not Found" ? (
          <NotFound />
      ) : (
          <div className={"container mt-5 px-6 max-w-7xl pb-20"}>
            <DetailWrapper>
              <div className={"flex justify-start gap-10"}>
                <div>
                  {isLoadingDetail || !dominantColor ? (
                      <Skeleton className={"rounded-xl w-[320px] h-[480px]"} />
                  ) : (
                      <Image
                          src={dataDetail.poster}
                          alt={dataDetail.title}
                          width={510}
                          height={1400}
                          className={"rounded-xl"}
                      />
                  )}
                </div>
                {isLoadingDetail || !dominantColor ? (
                    <Skeleton className={"rounded-xl w-[100%] h-[480px]"} />
                ) : (
                    <InnerDetail $backdrop={dataDetail.backdrop}>
                      <InnerDetailFilter $dominantColor={dominantColor} $contrastColor={contrastColor}>
                        <h1 className={"text-3xl font-bold"}>
                          {dataDetail.title}{" "}
                          {dataDetail.release_date && (
                              <span className={"font-extralight text-2xl"}>
                      ({new Date(dataDetail.release_date).getFullYear()})
                    </span>
                          )}
                        </h1>
                        <div className={"flex flex-col gap-5 mt-10"}>
                          <div>
                            <h1 className={"text-xl font-bold mb-2"}>Overview</h1>
                            <h1>{dataDetail.overview}</h1>
                          </div>
                        </div>
                      </InnerDetailFilter>
                    </InnerDetail>
                )}
              </div>
            </DetailWrapper>
            {/* SIMILAR SECTION */}
            <Scroller
                data={dataSimilar}
                loading={isLoadingSimilar}
                error={isErrorSimilar}
                title={"Similar"}
                group={group}
            />
          </div>
      )}
    </>
  );
};

const DetailWrapper = styled.div`
  padding: 12px;
  img {
    height: 480px !important;
  }
`;

const InnerDetail = styled.div`
  width: 100vw;
  height: 480px;
  border-radius: 8px;
  background-image: url(${({ $backdrop }) => $backdrop});
  background-size: cover;
  overflow: hidden;
`;

const InnerDetailFilter = styled.div`
  width: 100%;
  height: 480px;
  background: linear-gradient(
    to bottom right,
    rgb(${({ $dominantColor }) => $dominantColor?.join(", ")}),
    rgba(${({ $dominantColor }) => $dominantColor?.join(", ")}, 0.25)
  );
  z-index: 1;
  padding: 20px;
  color: ${({ $contrastColor }) => $contrastColor};
`;

export default DetailPage;
