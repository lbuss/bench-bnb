class Api::BenchesController < ApplicationController
  def new
  end

  def index
    if params[:bounds]
      @benches = in_bounds(params[:bounds])
    else
      @benches = Bench.all
    end
    render json: @benches
  end

  def seat_filter
    @seat_number = params[:seats]
    @benches = Bench.where("seats = #{@seat_number}")
    render json: @benches
  end

  def show
    @bench = Bench.find(params[:id])
    render json: [@bench]
  end

  def create
    @bench = Bench.create!(bench_params)
    render json: @bench
  end

  private

  def in_bounds(bounds)
    # {
 #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
 #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
 # }
    return Bench.where( lat: bounds[:southWest][:lat]...bounds[:northEast][:lat], lng: bounds[:southWest][:lng]...bounds[:northEast][:lng] ).order(:id)
  end

  def bench_params
    params.require(:bench).permit(:lat, :lng, :description, :seats, :url)
  end


end
